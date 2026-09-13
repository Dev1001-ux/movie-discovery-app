import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { searchMovies } from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import SortDropdown from "../components/SortDropdown";
import FilterBar from "../components/FilterBar";

function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page")) || 1;

    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    const [sort, setSort] = useState("default");
    const [type, setType] = useState("all");

useEffect(() => {
    if (!query) {
        setMovies([]);
        setTotalResults(0);
        return;
    }

    const controller = new AbortController();

    const loadMovies = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await searchMovies(
                query,
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
}, [query, page, retryCount]);

    const handleSearch = (newQuery) => {
        setSearchParams({
            query: newQuery,
            page: 1
        });
    };

    const handlePrevious = () => {
        if (page <= 1) {
            return;
        }

        setSearchParams({
            query,
            page: page - 1
        });
    };

    const handleNext = () => {
        const totalPages = Math.ceil(totalResults / 10);

        if (page >= totalPages) {
            return;
        }

        setSearchParams({
            query,
            page: page + 1
        });
    };

    const totalPages = Math.ceil(totalResults / 10);

    const sortedMovies = [...movies].sort((a, b) => {
        if (sort === "title-asc") {
            return a.title.localeCompare(b.title);
        }

        if (sort === "title-desc") {
            return b.title.localeCompare(a.title);
        }

        if (sort === "year-desc") {
            return Number(b.year) - Number(a.year);
        }

        if (sort === "year-asc") {
            return Number(a.year) - Number(b.year);
        }

        return 0;
    });

    const filteredMovies =
        type === "all"
            ? sortedMovies
            : sortedMovies.filter(
                (movie) => movie.type === type
            );

    return (
        <main>
            <section className="search-page">
                <h1>Search Movies</h1>

                <SearchBar onSearch={handleSearch} />

                {query && (
                    <p>
                        Showing results for:{" "}
                        <strong>{query}</strong>
                    </p>
                )}
            </section>

            {loading && <Loading />}

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
                            Found {totalResults} movies
                        </p>

                        <div className="discovery-controls">
                            <FilterBar
                                type={type}
                                onTypeChange={setType}
                            />

                            <SortDropdown
                                value={sort}
                                onChange={setSort}
                            />
                        </div>

                        <MovieGrid movies={filteredMovies} />

                        <div className="pagination">
                            <button
                                onClick={handlePrevious}
                                disabled={page <= 1}
                            >
                                ← Previous
                            </button>

                            <span>
                                Page {page} of {totalPages}
                            </span>

                            <button
                                onClick={handleNext}
                                disabled={page >= totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    </>
                )}

            {!loading &&
                !error &&
                !query && (
                    <EmptyState
                        message="Search for a movie to start discovering."
                    />
                )}

            {!loading &&
                !error &&
                query &&
                movies.length === 0 && (
                    <EmptyState />
                )}
        </main>
    );
}

export default SearchResults;