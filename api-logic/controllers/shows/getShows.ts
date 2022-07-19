import showSchema from "../../models/ShowModal";

const getShowById = async (id: string) => {
  try {
    return await showSchema.findById(id);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { getShowById };
