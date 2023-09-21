const Movie = require("../models/Movie.model");
const axios = require('axios');

module.exports.getNowPlaying = async (req, res, next) => {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN_TMDB}`,
      }
    };

    axios.get(url, options)
      .then(response => {
        console.log(response.data);
        return res.status(200).json(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      });
  } catch (error) {
    next(error);
  }
};

module.exports.getPopular = async (req, res, next) => {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN_TMDB}`,
      }
    };

    axios.get(url, options)
      .then(response => {
        console.log(response.data);
        return res.status(200).json(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      });
  } catch (error) {
    next(error);
  }
};

module.exports.getCredits = async (req, res, next) => {
  try {

    const { id } = req.params;

    const url =
      `https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN_TMDB}`,
      }
    };

    axios.get(url, options)
      .then(response => {
        console.log(response.data);
        return res.status(200).json(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      });
  } catch (error) {
    next(error);
  }
};
