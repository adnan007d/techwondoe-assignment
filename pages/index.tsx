import type { NextPage } from "next";
import { getShows } from "../util/db/getShows";
import Counter from "../components/Counter";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { clearToken, setToken } from "../util/util";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    getShows()
      .then((data) => console.log(data))
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.message.toLowerCase() === "unauthorized"
        ) {
          clearToken();
          router.push("/login");
        }
      });
  }, [router]);

  return (
    <div>
      <Counter />
    </div>
  );
};

export default Home;
