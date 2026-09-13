const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        movieId: {
            type: String,
            required: true,
            trim: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        year: {
            type: String,
            default: ""
        },

        posterUrl: {
            type: String,
            default: null
        },

        type: {
            type: String,
            default: "movie"
        }
    },
    {
        timestamps: true
    }
);

wishlistSchema.index(
    { movieId: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "Wishlist",
    wishlistSchema
);