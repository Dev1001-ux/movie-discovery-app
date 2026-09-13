const {
    searchMovies,
    getMovieById
} = require("../services/omdbService");

const normalizeMovie = require("../utils/normalizeMovie");
const searchMoviesController = async (req, res) => {
    try {
        const { query, page = 1 } = req.query;

        if (!query || query.trim() === "") {
            return res.status(400).json({
                message: "Movie search query is required"
            });
        }

        const currentPage = Number(page);

        if (!Number.isInteger(currentPage) || currentPage < 1) {
            return res.status(400).json({
                message: "Page must be a positive integer"
            });
        }

        const data = await searchMovies(
            query.trim(),
            currentPage
        );

        if (data.Response === "False") {
            return res.status(200).json({
                page: currentPage,
                totalResults: 0,
                results: []
            });
        }

        const movies = data.Search.map(normalizeMovie);

        res.json({
            page: currentPage,
            totalResults: Number(data.totalResults),
            results: movies
        });
    } catch (error) {
        console.error(
            "Movie search error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to fetch movie details"
        });
    }
};

const getMovieDetailsController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !id.startsWith("tt")) {
            return res.status(400).json({
                message: "Valid IMDb movie ID is required"
            });
        }

        const movie = await getMovieById(id);

        if (movie.Response === "False") {
            return res.status(404).json({
                message: movie.Error || "Movie not found"
            });
        }

        res.json({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            rated: movie.Rated,
            released: movie.Released,
            runtime: movie.Runtime,
            genre: movie.Genre,
            director: movie.Director,
            writers: movie.Writer,
            actors: movie.Actors,
            plot: movie.Plot,
            language: movie.Language,
            country: movie.Country,
            awards: movie.Awards,
            posterUrl: movie.Poster !== "N/A"
                ? movie.Poster
                : null,
            ratings: movie.Ratings,
            metascore: movie.Metascore,
            imdbRating: movie.imdbRating,
            imdbVotes: movie.imdbVotes,
            type: movie.Type
        });
    } catch (error) {
        console.error(
            "Movie details error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to fetch movie details"
        });
    }
};
module.exports = {
    searchMoviesController,
    getMovieDetailsController
};