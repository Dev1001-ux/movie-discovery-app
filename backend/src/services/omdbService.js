const axios = require("axios");

const omdbApi = axios.create({
    baseURL: "https://www.omdbapi.com/",
    params: {
        apikey: process.env.OMDB_API_KEY
    },
    timeout: 10000
});

const searchMovies = async (query, page = 1) => {
    try {
        const response = await omdbApi.get("/", {
            params: {
                s: query,
                type: "movie",
                page
            }
        });

        return response.data;
    } catch (error) {
        console.error(
            "OMDb search error:",
            error.response?.data || error.message
        );

        throw new Error(
            "Unable to connect to movie service"
        );
    }
};

const getMovieById = async (imdbId) => {
    try {
        const response = await omdbApi.get("/", {
            params: {
                i: imdbId,
                plot: "full"
            }
        });

        return response.data;
    } catch (error) {
        console.error(
            "OMDb details error:",
            error.response?.data || error.message
        );

        throw new Error(
            "Unable to connect to movie service"
        );
    }
};

module.exports = {
    searchMovies,
    getMovieById
};