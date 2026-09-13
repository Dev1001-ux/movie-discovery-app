const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVariables = [
    "MONGODB_URI",
    "OMDB_API_KEY"
];

const missingEnvVariables =
    requiredEnvVariables.filter(
        (variable) => !process.env[variable]
    );

if (missingEnvVariables.length > 0) {
    console.error(
        `Missing environment variables: ${missingEnvVariables.join(", ")}`
    );

    process.exit(1);
}

const connectDB = require("./src/config/db");
const movieRoutes = require("./src/routes/movieRoutes");
const wishlistRoutes = require("./src/routes/wishlistRoutes");

const notFound = require("./src/middleware/notFound");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Movie Discovery API is running"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Backend is healthy"
    });
});

app.use(notFound);
app.use(errorHandler);

/*
 * Global error handler
 * Must be the last middleware.
 */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});