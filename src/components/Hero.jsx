import axios from "axios";
import React, { useEffect, useState } from "react";
import { createImageUrl, endpoints } from "../services/movieServices";

const Hero = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(endpoints.popular).then((res) => {
      const moviesData = res.data.results;
      if (moviesData) {
        const randomMovie =
          moviesData[Math.floor(Math.random() * moviesData.length)];
        setMovie(randomMovie);
      }
    });
  }, []);

  if (!movie) {
    return <p>Loading movie...</p>;
  }
  const { title, backdrop_path, release_date, overview } = movie;

  return (
    <div className="h-[450px] w-full lg:h-[600px]">
      <div className="h-full w-full">
        <div className="absolute h-[450px] w-full bg-gradient-to-r from-black lg:h-[600px]" />
        <img
          src={createImageUrl(backdrop_path, "original")}
          alt={title}
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute top-[10%] w-full p-4 md:p-8 lg:top-[25%]">
          <h1 className="font-nsans-bold text-3xl md:text-6xl">{title}</h1>
          <div className="mt-8 mb-4 space-x-2">
            <button className="mb-4 border bg-gray-300 px-5 py-2 text-black capitalize">
              play
            </button>
            <button className="mb-4 border border-gray-300 px-5 py-2 capitalize">
              watch later
            </button>
            <div>
              <p className="text-sm text-gray-500">{release_date}</p>
              <p className="w-full text-gray-200 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
                {overview.slice(0, 200)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
