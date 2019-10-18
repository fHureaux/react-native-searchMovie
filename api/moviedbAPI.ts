const API_KEY: string = "f40d2a0ce2eb84c40a769d3b4202a514";

// Call moviedb API to get movies list from keyword(s)
export const getFilmsFromText = async (movieToSearch: string, page: number) => {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&query=" +
    movieToSearch +
    "&page=" +
    page;

  return await fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
};

// Construct a url to access to images
export const getImageFromApi = poster_path => {
  return "https://image.tmdb.org/t/p/w500" + poster_path;
};

// Call moviedb API to get a movie from its ID
export const getFilmFromId = async (movieIdToSearch: number) => {
  const url =
    "https://api.themoviedb.org/3/movie/" +
    movieIdToSearch +
    "?api_key=" +
    API_KEY;

  return await fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
};
