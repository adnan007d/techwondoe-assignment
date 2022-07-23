import React from "react";
import { useSelector } from "react-redux";
import { selectShows } from "../../features/shows/showsSlice";
import Show from "./Show";

const Shows = () => {
  const shows = useSelector(selectShows);

  return (
    <div>
      <main className="flex flex-wrap gap-5 justify-center">
        {shows.map((show) => (
          <Show key={show._id} show={show} />
        ))}
      </main>
    </div>
  );
};

export default Shows;
