import type { NextPage } from "next";
import { getShows } from "../util/db/getShows";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { checkIfUnauthorized } from "../util/util";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    getShows()
      .then((data) => console.log(data))
      .catch((err) => {
        if (checkIfUnauthorized(err)) {
          router.push("/login");
        }
      });
  }, [router]);

  return (
    <div>
      <ResponsiveDrawer>
        <div>Hello World</div>
      </ResponsiveDrawer>
    </div>
  );
};

export default Home;
