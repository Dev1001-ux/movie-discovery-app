import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { searchMovies } from "../services/api";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SearchBar from "../components/SearchBar";
import CategoryBar from "../components/CategoryBar";

function Home() {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    const [category, setCategory] = useState("batman");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const controller = new AbortController();

        const loadMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await searchMovies(
                    category,
                    page,
                    controller.signal
                );

                setMovies(data.results);
                setTotalResults(data.totalResults);
            } catch (error) {
                if (error.name === "CanceledError") {
                    return;
                }

                console.error(error);

                setMovies([]);
                setTotalResults(0);

                setError(
    error.code === "ECONNABORTED"
        ? "The request took too long. Please try again."
        : error.response?.data?.message ||
          "Failed to load movies"
);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        loadMovies();

        return () => {
            controller.abort();
        };
}, [category, page, retryCount]);

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setPage(1);
    };

    const handleSearch = (query) => {
        navigate(
            `/search?query=${encodeURIComponent(query)}&page=1`
        );
    };

    const totalPages = Math.ceil(
        totalResults / 10
    );

    return (
        <main>
            <section className="hero">
                <h1>Movie Discovery App</h1>

                <p>
                    Discover movies and find something to watch.
                </p>

                <SearchBar
                    onSearch={handleSearch}
                />
            </section>

            <section className="discovery-section">
                <h2>Explore Movies</h2>

                <CategoryBar
                    selectedCategory={category}
                    onCategoryChange={handleCategoryChange}
                />

                {loading && (
                    <Loading message="Discovering movies..." />
                )}

                {!loading && error && (
    <ErrorMessage
        message={error}
        onRetry={() =>
            setRetryCount(
                (currentCount) => currentCount + 1
            )
        }
    />
)}

                {!loading &&
                    !error &&
                    movies.length > 0 && (
                        <>
                            <p className="results-count">
                                Showing {movies.length} of{" "}
                                {totalResults} results
                            </p>

                            <MovieGrid movies={movies} />

                            <div className="pagination">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage(
                                            (currentPage) =>
                                                currentPage - 1
                                        )
                                    }
                                    disabled={page <= 1}
                                >
                                    ← Previous
                                </button>

                                <span>
                                    Page {page} of{" "}
                                    {totalPages}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage(
                                            (currentPage) =>
                                                currentPage + 1
                                        )
                                    }
                                    disabled={
                                        page >= totalPages
                                    }
                                >
                                    Next →
                                </button>
                            </div>
                        </>
                    )}

                {!loading &&
                    !error &&
                    movies.length === 0 && (
                        <p className="empty-state">
                            No movies found for this discovery category.
                        </p>
                    )}
            </section>
        </main>
    );
}

export default Home;