const express = require("express");

const {
    searchMoviesController,
    getMovieDetailsController
} = require("../controllers/movieController");

const router = express.Router();

router.get("/search", searchMoviesController);

router.get("/:id", getMovieDetailsController);

module.exports = router;