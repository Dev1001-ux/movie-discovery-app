import { useState } from "react";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            return;
        }

        onSearch(trimmedQuery);
    };

    return (
        <form
            className="search-bar"
            onSubmit={handleSubmit}
        >
            <label
                htmlFor="movie-search"
                className="search-label"
            >
                Search movies
            </label>

            <div className="search-input-group">
                <input
                    id="movie-search"
                    type="search"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(event) =>
                        setQuery(event.target.value)
                    }
                    autoComplete="off"
                />

                <button type="submit">
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;