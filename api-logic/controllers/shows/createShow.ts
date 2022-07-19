import showSchema, { IShow } from "../../models/Shows";
import { generateUserResult } from "./showUtil";

const createShowImpl = async (show: IShow) => {
  const showDoc = await showSchema.create({
    ...show,
  });

  return generateUserResult(false, "Show Created", showDoc);
};

const createShow = async (show: IShow) => {
  try {
    return createShowImpl(show);
  } catch (err) {
    console.error(err);
    return generateUserResult(true, "Something went wrong");
  }
};

export { createShow };
