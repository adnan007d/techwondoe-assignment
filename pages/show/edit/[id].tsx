import React from "react";
import { useSelector } from "react-redux";
import ResponsiveDrawer from "../../../components/ResponsiveDrawer";
import ShowForm from "../../../components/ShowForm";
import { selectCurrentShow } from "../../../features/shows/showsSlice";

const EditShow = () => {
  const currentShow = useSelector(selectCurrentShow);

  return (
    <ResponsiveDrawer>
      <ShowForm show={currentShow} />
    </ResponsiveDrawer>
  );
};

export default EditShow;
