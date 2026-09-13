function FilterBar({ type, onTypeChange }) {
    return (
        <div className="filter-bar">
            <label htmlFor="type-filter">
                Type:
            </label>

            <select
                id="type-filter"
                value={type}
                onChange={(event) =>
                    onTypeChange(event.target.value)
                }
            >
                <option value="all">
                    All
                </option>

                <option value="movie">
                    Movies
                </option>
            </select>
        </div>
    );
}

export default FilterBar;