import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MoviesRow = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const rowId = crypto.randomUUID();

  useEffect(() => {
    axios.get(url).then((res) => {
      setMovies(res.data.results);
    });
  }, [url]);

  const slide = (offset) => {
    const slider = document.getElementById(rowId);
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  return (
    <div>
      <h2 className="font-nsans-bold p-4 capitalize md:text-xl">{title}</h2>
      <div className="group relative flex items-center">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="absolute left-2 z-10 hidden cursor-pointer rounded-full bg-white text-gray-700 opacity-80 group-hover:block"
          size={40}
        />
        <div
          id={rowId}
          className="h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="absolute right-2 z-10 hidden cursor-pointer rounded-full bg-white text-gray-700 opacity-80 group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};

export default MoviesRow;
