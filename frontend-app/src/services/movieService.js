import axios from "axios";
const URL = import.meta.env.VITE_BACK_BASE_URL;

const movieService = {
  getNowPlayingMovies: async () => {
    try {
      const response = await axios.get(`${URL}/movies/playing/`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching film details");
    }
  },

  getPopularMovies: async () => {
    try {
      const response = await axios.get(`${URL}/movies/popular/`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching film details");
    }
  },

  getMovieCredits: async (filmId) => {
    try {
      const response = await axios.get(`${URL}/movies/credits/${filmId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching film details");
    }
  },
};

export default movieService;
