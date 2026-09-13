function SortDropdown({ value, onChange }) {
    return (
        <div className="sort-dropdown">
            <label htmlFor="sort">
                Sort by:
            </label>

            <select
                id="sort"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="default">
                    Default
                </option>

                <option value="title-asc">
                    Title A → Z
                </option>

                <option value="title-desc">
                    Title Z → A
                </option>

                <option value="year-desc">
                    Newest First
                </option>

                <option value="year-asc">
                    Oldest First
                </option>
            </select>
        </div>
    );
}

export default SortDropdown;