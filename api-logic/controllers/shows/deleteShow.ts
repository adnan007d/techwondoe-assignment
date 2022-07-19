import showSchema from "../../models/ShowModal";
import { generateShowResult } from "./showUtil";

const deleteShowImpl = async (userId: string, showId: string) => {
  const showDoc = await showSchema.findOneAndDelete({
    _id: showId,
    userId,
  });

  if (showDoc) {
    return generateShowResult(false, "Show Deleted Successfully");
  } else {
    return generateShowResult(true, "Invalid Show Id");
  }
};

const deleteShow = async (userId: string, showId: string) => {
  try {
    return deleteShowImpl(userId, showId);
  } catch (err) {
    console.error(err);
    return generateShowResult(true, "Something went wrong");
  }
};

export { deleteShow };
