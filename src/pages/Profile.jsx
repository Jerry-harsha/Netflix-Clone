import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { userAuth } from "../context/AuthContext";
import { database } from "../services/firebase";
import { createImageUrl } from "../services/movieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [movies, setMovies] = useState(null);
  const { user } = userAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(database, "users", `${user.email}`), (doc) => {
        if (doc.data()) {
          setMovies(doc.data().favShows);
        }
      });
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const removeFavShow = async (movie) => {
    const userDoc = doc(database, "users", user.email);

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    });
  };

  return (
    <div>
      <div>
        <img
          className="block h-[600px] w-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_medium.jpg"
          alt=""
        />
        <div className="fixed top-0 left-0 h-[600px] w-full bg-black/60" />
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="font-nsans-bold my-2 text-3xl md:text-5xl">
            My WatchList
          </h1>
          <p className="font-nsans-light text-lg">{user.email}</p>
        </div>
      </div>

      <h2 className="font-nsans-bold p-4 capitalize md:text-xl">Fav Shows</h2>
      <div className="group relative flex items-center">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="absolute left-2 z-10 hidden cursor-pointer rounded-full bg-white text-gray-700 opacity-80 group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          className="h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap"
        >
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="relative m-2 inline-block w-[160px] cursor-pointer overflow-hidden rounded-lg sm:w-[200px] md:w-[240px] lg:w-[280px]"
            >
              <img
                src={createImageUrl(movie.backdrop_path, "w500")}
                alt={movie.title}
              />
              <div className="absolute top-0 left-0 h-full w-full bg-black/80 opacity-0 hover:opacity-100">
                <p className="font-nsans-bold flex h-full items-center justify-center text-xs whitespace-normal md:text-sm">
                  {movie.title}
                </p>
                <p>
                  <AiOutlineClose
                    onClick={() => removeFavShow(movie)}
                    size={30}
                    className="absolute top-2 right-2"
                  />
                </p>
              </div>
            </div>
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

export default Profile;
