import userSchema, { IUser } from "../../models/UserModal";
import bcrypt from "bcrypt";
import { generateUserResult } from "./userUtil";

const createUserImpl = async (user: IUser) => {
  const user_ = await userSchema.findOne({ username: user.username });
  if (user_) {
    return generateUserResult(true, "User Already exists");
  }

  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
  const userDoc = await userSchema.create({
    ...user,
  });

  return generateUserResult(false, "User Created", userDoc);
};

const createUser = async (user: IUser) => {
  try {
    return await createUserImpl(user);
  } catch (err) {
    console.error(err);
    return generateUserResult(true, "Something went wrong");
  }
};

export { createUser };
