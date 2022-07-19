import userSchema, { IUser } from "../../models/UserModal";
import bcrypt from "bcrypt";
import { generateUserResult } from "./userUtil";

const getUserImpl = async (user: IUser) => {
  const user_ = await userSchema.findOne({ username: user.username });
  if (!user_) {
    return generateUserResult(true, "Invalid username or password");
  }

  const validated = await bcrypt.compare(user.password, user_.password);

  if (!validated) {
    return generateUserResult(true, "Invalid username or password");
  }

  return generateUserResult(false, "User Found", user_);
};

const getUser = async (user: IUser) => {
  try {
    return getUserImpl(user);
  } catch (err) {
    console.error(err);

    return generateUserResult(true, "Something went wrong");
  }
};

export { getUser };
