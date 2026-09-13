const normalizeMovie = (movie) => {
    return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        type: movie.Type,
        posterUrl: movie.Poster !== "N/A" ? movie.Poster : null
    };
};

module.exports = normalizeMovie;