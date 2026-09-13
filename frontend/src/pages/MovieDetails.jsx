import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getMovieDetails } from "../services/api";
import { useWishlist } from "../context/WishlistContext";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieInfoItem from "../components/MovieInfoItem";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    } = useWishlist();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [wishlistMessage, setWishlistMessage] = useState("");
    const [wishlistError, setWishlistError] = useState("");


    useEffect(() => {
        const loadMovieDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMovieDetails(id);

                setMovie(data);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load movie details"
                );
            } finally {
                setLoading(false);
            }
        };

        loadMovieDetails();
    }, [id]);

if (loading) {
    return (
        <Loading message="Loading movie details..." />
    );
}

    if (error) {
        return (
            <main className="movie-details">
                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <ErrorMessage message={error} />
            </main>
        );
    }

    if (!movie) {
        return (
            <main className="movie-details">
                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <ErrorMessage message="Movie not found" />
            </main>
        );
    }

    return (
        <main className="movie-details">
            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Back to results
            </button>

            <div className="movie-details-content">

                <div className="movie-details-poster">
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

                <div className="movie-details-info">

                    <h1>{movie.title}</h1>

                    <button
    className="wishlist-button"
    onClick={async () => {
        setWishlistMessage("");
        setWishlistError("");

        if (isInWishlist(movie.id)) {
            const result =
                await removeFromWishlist(movie.id);

            if (result.success) {
                setWishlistMessage(
                    "Movie removed from wishlist"
                );
            } else {
                setWishlistError(
                    result.message
                );
            }

            return;
        }

        const result = await addToWishlist({
            id: movie.id,
            title: movie.title,
            year: movie.year,
            posterUrl: movie.posterUrl,
            type: movie.type
        });

        if (result.success) {
            setWishlistMessage(
                "Movie added to wishlist"
            );
        } else {
            setWishlistError(
                result.message
            );
        }
    }}
>
    {isInWishlist(movie.id)
        ? "♥ Remove from Wishlist"
        : "♡ Add to Wishlist"}
</button>

{wishlistMessage && (
    <p className="wishlist-message">
        {wishlistMessage}
    </p>
)}

{wishlistError && (
    <p className="wishlist-error">
        {wishlistError}
    </p>
)}

                    <div className="movie-details-meta">
                        <span>{movie.year}</span>
                        <span>{movie.runtime}</span>
                        <span>IMDb {movie.imdbRating}</span>
                    </div>

                    <div className="movie-details-section">
                        <h2>Overview</h2>

                        <p>
                            {movie.plot || "No plot information available."}
                        </p>
                    </div>

                    <div className="movie-details-section">
                        <h2>Movie Information</h2>

                        <MovieInfoItem
    label="Released"
    value={movie.released}
/>

<MovieInfoItem
    label="Genre"
    value={movie.genre}
/>

<MovieInfoItem
    label="Rated"
    value={movie.rated}
/>

<MovieInfoItem
    label="Language"
    value={movie.language}
/>

<MovieInfoItem
    label="Country"
    value={movie.country}
/>
                    </div>

                    <div className="movie-details-section">
                        <h2>Credits</h2>

                        <MovieInfoItem
    label="Director"
    value={movie.director}
/>

<MovieInfoItem
    label="Writers"
    value={movie.writers}
/>

<MovieInfoItem
    label="Actors"
    value={movie.actors}
/>
                    </div>

                    <div className="movie-details-section">
                        <h2>Ratings & Awards</h2>

                       <MovieInfoItem
    label="IMDb Rating"
    value={movie.imdbRating}
/>

<MovieInfoItem
    label="IMDb Votes"
    value={movie.imdbVotes}
/>

<MovieInfoItem
    label="Metascore"
    value={movie.metascore}
/>

<MovieInfoItem
    label="Awards"
    value={movie.awards}
/>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default MovieDetails;