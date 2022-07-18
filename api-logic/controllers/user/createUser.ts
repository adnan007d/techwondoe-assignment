import userSchema, { IUser } from "../../models/UserModal";
import bcrypt from "bcrypt";

const createUser = async (user: IUser) => {
  try {
    const user_ = await userSchema.findOne({ username: user.username });
    if (user_) {
      return {
        error: true,
        response: {
          data: null,
          message: "User Already exists",
        },
      };
    }

    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    const userDoc = await userSchema.create({
      ...user,
    });

    return {
      error: false,
      response: {
        data: userDoc,
        message: "User Created",
      },
    };
  } catch (err) {
    console.error(err);
    return {
      error: true,
      response: {
        data: null,
        message: "Something went wrong",
      },
    };
  }
};

export { createUser };
