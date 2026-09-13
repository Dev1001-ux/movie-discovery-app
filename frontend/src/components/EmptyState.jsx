function EmptyState({
    message = "No movies found."
}) {
    return (
        <div
            className="empty-state"
            role="status"
        >
            <div className="empty-state-icon">
                🎬
            </div>

            <h2>Nothing here yet</h2>

            <p>{message}</p>
        </div>
    );
}

export default EmptyState;