import showSchema from "../../models/Shows";
import { generateUserResult } from "./showUtil";

const deleteShowImpl = async (userId: string, showId: string) => {
  const showDoc = await showSchema.findOneAndDelete({
    _id: showId,
    userId,
  });

  if (showDoc) {
    return generateUserResult(false, "Show Deleted Successfully");
  } else {
    return generateUserResult(true, "Invalid Show Id");
  }
};

const deleteShow = async (userId: string, showId: string) => {
  try {
    return deleteShowImpl(userId, showId);
  } catch (err) {
    console.error(err);
    return generateUserResult(true, "Something went wrong");
  }
};

export { deleteShow };
