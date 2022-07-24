import showSchema from "../../models/ShowModal";

const getShowById = async (id: string) => {
  try {
    return await showSchema
      .findById(id)
      .populate("ratings")
      .populate("reviews")
      .populate("userId", "username _id");
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getShows = async () => {
  try {
    return await showSchema
      .find()
      .populate("ratings")
      .populate("reviews")
      .populate("userId", "username _id");
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getShowsByUser = async (userId: string) => {
  try {
    return await showSchema
      .find({
        userId,
      })
      .populate("ratings")
      .populate("reviews")
      .populate("userId", "username _id");
  } catch (err) {
    console.error(err);
    return [];
  }
};

export { getShowById, getShows, getShowsByUser };
