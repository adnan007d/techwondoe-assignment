import { NextPage } from "next";
import React from "react";
import ResponsiveDrawer from "../../components/ResponsiveDrawer";
import ShowForm from "../../components/ShowForm";

const ShowAdd: NextPage = () => {
  return (
    <ResponsiveDrawer>
      <ShowForm />;
    </ResponsiveDrawer>
  );
};

export default ShowAdd;
