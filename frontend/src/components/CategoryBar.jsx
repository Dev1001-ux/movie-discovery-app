function CategoryBar({
    selectedCategory,
    onCategoryChange
}) {
    const categories = [
        {
            label: "Popular",
            query: "batman"
        },
        {
            label: "Action Picks",
            query: "action"
        },
        {
            label: "Comedy Picks",
            query: "comedy"
        },
        {
            label: "Drama Picks",
            query: "drama"
        },
        {
            label: "Animation Picks",
            query: "animation"
        },
        {
            label: "Sci-Fi Picks",
            query: "star"
        }
    ];

    return (
        <div
            className="category-bar"
            aria-label="Movie discovery categories"
        >
            {categories.map((category) => (
                <button
                    key={category.label}
                    type="button"
                    className={
                        selectedCategory === category.query
                            ? "category-button active"
                            : "category-button"
                    }
                    onClick={() =>
                        onCategoryChange(category.query)
                    }
                    aria-pressed={
                        selectedCategory === category.query
                    }
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}

export default CategoryBar;