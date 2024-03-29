import showSchema, { IShow } from "../../models/ShowModal";
import { generateShowResult } from "./showUtil";

const createShowImpl = async (show: IShow) => {
  const showDoc = await showSchema.create({
    ...show,
  });

  return generateShowResult(
    false,
    "Show Created",
    await showDoc.populate("userId", "username _id")
  );
};

const createShow = async (show: IShow) => {
  try {
    return await createShowImpl(show);
  } catch (err) {
    console.error(err);
    return generateShowResult(true, "Something went wrong");
  }
};

export { createShow };
