const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find()
            .sort({ createdAt: -1 });

        res.json({
            results: wishlist
        });
    } catch (error) {
        console.error(
            "Get wishlist error:",
            error.message
        );

        res.status(500).json({
            message: "Failed to fetch wishlist"
        });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const {
            movieId,
            title,
            year,
            posterUrl,
            type
        } = req.body;

        if (!movieId || !title) {
            return res.status(400).json({
                message: "Movie ID and title are required"
            });
        }

        const existingMovie = await Wishlist.findOne({
            movieId
        });

        if (existingMovie) {
            return res.status(409).json({
                message: "Movie is already in wishlist"
            });
        }

        const wishlistMovie = await Wishlist.create({
            movieId,
            title,
            year,
            posterUrl,
            type
        });

        res.status(201).json({
            message: "Movie added to wishlist",
            movie: wishlistMovie
        });
    } catch (error) {
        console.error(
            "Add wishlist error:",
            error.message
        );

        res.status(500).json({
            message: "Failed to add movie to wishlist"
        });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { movieId } = req.params;

        const deletedMovie =
            await Wishlist.findOneAndDelete({
                movieId
            });

        if (!deletedMovie) {
            return res.status(404).json({
                message: "Movie not found in wishlist"
            });
        }

        res.json({
            message: "Movie removed from wishlist"
        });
    } catch (error) {
        console.error(
            "Remove wishlist error:",
            error.message
        );

        res.status(500).json({
            message: "Failed to remove movie from wishlist"
        });
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist
};