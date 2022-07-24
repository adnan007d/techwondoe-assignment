import { NextPage } from "next";
import React, { useEffect } from "react";
import ResponsiveDrawer from "../../components/ResponsiveDrawer";
import Shows from "../../components/Shows";

import { useDispatch, useSelector } from "react-redux";
import { setShows } from "../../features/shows/showsSlice";
import { useRouter } from "next/router";
import { getShowsByUser } from "../../util/db/getShows";
import { checkIfUnauthorized } from "../../util/util";
import { selectUser } from "../../features/user/userSlice";

const MyShows: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    getShowsByUser(user?._id!)
      .then((data) => dispatch(setShows(data)))
      .catch((err) => {
        if (checkIfUnauthorized(err)) {
          router.push("/login");
        }
      });
  }, [router, dispatch, user]);

  return (
    <ResponsiveDrawer>
      <Shows />
    </ResponsiveDrawer>
  );
};

export default MyShows;
