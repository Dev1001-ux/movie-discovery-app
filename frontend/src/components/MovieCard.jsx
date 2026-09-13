import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
        }
    };

    return (
        <article
            className="movie-card"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${movie.title}`}
        >
            <div className="movie-poster">
                {movie.posterUrl ? (
                    <img
                        src={movie.posterUrl}
                        alt={`${movie.title} poster`}
                    />
                ) : (
                    <div className="poster-placeholder">
                        <span>No Poster</span>
                    </div>
                )}
            </div>

            <div className="movie-info">
                <h2>{movie.title}</h2>

                <div className="movie-meta">
                    <span>{movie.year}</span>
                    <span>{movie.type}</span>
                </div>
            </div>
        </article>
    );
}

export default MovieCard;