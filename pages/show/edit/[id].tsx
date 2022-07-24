import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveDrawer from "../../../components/ResponsiveDrawer";
import ShowForm from "../../../components/ShowForm";
import CircularProgress from "@mui/material/CircularProgress";

import {
  selectCurrentShow,
  setCurrentShow,
} from "../../../features/shows/showsSlice";
import { getShowById } from "../../../util/db/getShows";
import { handleError } from "../../../util/util";
import LoadingComponent from "../../../components/Loading";

const EditShow = () => {
  const currentShow = useSelector(selectCurrentShow);

  const router = useRouter();
  const id = router.query.id as string;

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentShow) return;
    setLoading(true);
    const fetchShow = async (showId: string) => {
      try {
        const response = await getShowById(showId);
        dispatch(setCurrentShow(response));
      } catch (err) {
        handleError({ err, enqueueSnackbar, router });
      }
      setLoading(false);
    };

    fetchShow(id);
  }, [id, router, enqueueSnackbar, currentShow, dispatch]);

  return (
    <ResponsiveDrawer>
      {loading ? (
        <LoadingComponent />
      ) : (
        currentShow && <ShowForm show={currentShow} />
      )}
    </ResponsiveDrawer>
  );
};

export default EditShow;
