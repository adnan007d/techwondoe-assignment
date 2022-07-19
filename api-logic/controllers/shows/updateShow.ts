import showSchema, { IShow } from "../../models/ShowModal";
import { generateUserResult } from "./showUtil";

const updateShowImpl = async (userId: string, show: IShow) => {
  const showDoc = await showSchema.findOneAndUpdate(
    {
      userId,
      _id: show._id,
    },
    {
      ...show,
    }
  );

  if (showDoc) {
    return generateUserResult(false, "Show Updated Successfully", showDoc);
  } else {
    return generateUserResult(true, "Invalid Show Id");
  }
};

const updateShow = async (userId: string, show: IShow) => {
  try {
    return updateShowImpl(userId, show);
  } catch (err) {
    console.error(err);
    return generateUserResult(true, "Something went wrong");
  }
};

export { updateShow };
