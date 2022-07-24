import showSchema, { IShow } from "../../models/ShowModal";
import { generateShowResult } from "./showUtil";

const updateShowImpl = async (userId: string, show: IShow) => {
  const showDoc = await showSchema
    .findOneAndUpdate(
      {
        userId,
        _id: show._id,
      },
      {
        ...show,
      },
      {
        new: true,
      }
    )
    .populate("ratings")
    .populate("reviews")
    .populate("userId", "username _id");

  if (showDoc) {
    return generateShowResult(false, "Show Updated Successfully", showDoc);
  } else {
    return generateShowResult(true, "Invalid Show Id");
  }
};

const updateShow = async (userId: string, show: IShow) => {
  try {
    return await updateShowImpl(userId, show);
  } catch (err) {
    console.error(err);
    return generateShowResult(true, "Something went wrong");
  }
};

export { updateShow };
