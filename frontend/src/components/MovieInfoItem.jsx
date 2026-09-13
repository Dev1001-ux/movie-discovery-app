function MovieInfoItem({ label, value }) {
    const displayValue =
        value && value !== "N/A"
            ? value
            : "Not available";

    return (
        <p>
            <strong>{label}:</strong>{" "}
            {displayValue}
        </p>
    );
}

export default MovieInfoItem;