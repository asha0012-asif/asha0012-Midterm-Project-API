const { Router } = require("express");

const moviesController = require("../controllers/movies"); 
const moviesRouter = Router();

moviesRouter.get("/", moviesController.getMoviesBySort);
moviesRouter.get("/favourites", moviesController.getFavouriteMovies);
moviesRouter.get("/:id", moviesController.getMovieByID);
moviesRouter.post("/:id/favourite", moviesController.addMovieToFavourites);

module.exports = moviesRouter;