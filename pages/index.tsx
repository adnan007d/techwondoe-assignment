import type { NextPage } from "next";
import { getShows } from "../util/db/getShows";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { checkIfUnauthorized } from "../util/util";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Shows from "../components/Shows";
import { useDispatch } from "react-redux";
import { setShows } from "../features/shows/showsSlice";

const Home: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    getShows()
      .then((data) => dispatch(setShows(data)))
      .catch((err) => {
        if (checkIfUnauthorized(err)) {
          router.push("/login");
        }
      });
  }, [router, dispatch]);

  return (
    <div>
      <ResponsiveDrawer>
        <Shows />
      </ResponsiveDrawer>
    </div>
  );
};

export default Home;
