import React, { useState } from "react";
import { createImageUrl } from "../services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { userAuth } from "../context/AuthContext";
import { database } from "../services/firebase";

const MovieCard = ({ movie }) => {
  const [fav, setFav] = useState(false);
  const { title, backdrop_path, poster_path } = movie;
  const { user } = userAuth();

  const saveFavShow = async () => {
    const userEmail = user?.email;

    if (userEmail) {
      const userDoc = doc(database, "users", userEmail);
      setFav(!fav);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie }),
      });
    } else {
      alert("Login to save fav movies...");
    }
  };

  return (
    <div className="relative m-2 inline-block w-[160px] cursor-pointer overflow-hidden rounded-lg sm:w-[200px] md:w-[240px] lg:w-[280px]">
      <img src={createImageUrl(backdrop_path, "w500")} alt={title} />
      <div className="absolute top-0 left-0 h-full w-full bg-black/80 opacity-0 hover:opacity-100">
        <p className="font-nsans-bold flex h-full items-center justify-center text-xs whitespace-normal md:text-sm">
          {title}
        </p>
        <p onClick={saveFavShow} className="cursor-pointer">
          {fav ? (
            <FaHeart
              size={20}
              className="absolute top-2 right-2 text-gray-200"
            />
          ) : (
            <FaRegHeart
              size={20}
              className="absolute top-2 right-2 text-gray-200"
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
