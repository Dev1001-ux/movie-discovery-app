import { useWishlist } from "../context/WishlistContext";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

function Wishlist() {
    const {
        wishlist,
        loading
    } = useWishlist();

    if (loading) {
        return (
            <Loading message="Loading your wishlist..." />
        );
    }

    const movies = wishlist.map((movie) => ({
        id: movie.movieId,
        title: movie.title,
        year: movie.year,
        posterUrl: movie.posterUrl,
        type: movie.type
    }));

    return (
        <main>
            <section className="search-page">
                <h1>My Wishlist</h1>

                <p>
                    Movies you have saved for later.
                </p>
            </section>

            {movies.length > 0 ? (
                <>
                    <p className="results-count">
                        {movies.length}{" "}
                        {movies.length === 1
                            ? "movie"
                            : "movies"}{" "}
                        in your wishlist
                    </p>

                    <MovieGrid movies={movies} />
                </>
            ) : (
                <EmptyState
                    message="Your wishlist is empty. Add some movies to see them here."
                />
            )}
        </main>
    );
}

export default Wishlist;