function ErrorMessage({
    message = "Something went wrong.",
    onRetry
}) {
    return (
        <div
            className="error-message"
            role="alert"
        >
            <h2>Something went wrong</h2>

            <p>{message}</p>

            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                >
                    Try Again
                </button>
            )}
        </div>
    );
}

export default ErrorMessage;