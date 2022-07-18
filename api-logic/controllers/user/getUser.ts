import userSchema, { IUser } from "../../models/UserModal";
import bcrypt from "bcrypt";

const getUser = async (user: IUser) => {
  try {
    const user_ = await userSchema.findOne({ username: user.username });
    if (!user_) {
      return {
        error: true,
        response: {
          data: null,
          message: "Invalid username or password",
        },
      };
    }

    const validated = await bcrypt.compare(user.password, user_.password);

    if (!validated) {
      return {
        error: true,
        response: {
          data: null,
          message: "Invalid username or password",
        },
      };
    }

    return {
      error: false,
      response: {
        data: user_,
        message: "User Found",
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

export { getUser };
