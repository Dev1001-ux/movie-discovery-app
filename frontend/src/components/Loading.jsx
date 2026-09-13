function Loading({ message = "Loading..." }) {
    return (
        <div
            className="loading"
            role="status"
            aria-live="polite"
        >
            <div className="loading-spinner"></div>

            <p>{message}</p>
        </div>
    );
}

export default Loading;