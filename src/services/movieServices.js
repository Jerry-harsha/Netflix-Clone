const key = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const endpoints = {
  popular: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=1`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  trending: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,
  comedy: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export const createImageUrl = (filename, size) => {
  if (!filename) return null;
  return `https://image.tmdb.org/t/p/${size}${filename}`;
};
