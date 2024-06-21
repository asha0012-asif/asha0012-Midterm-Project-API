const movieService = require("../services/movies");

const getMoviesBySort = (req, res, next) => {
    
    try {
        const keyword = req.query.keyword;
        const sort = req.query.sort;
        
        const movies = movieService.getMoviesBySort(keyword, sort);

        res.status(200).json({
            data: movies
        });

    } catch (err) {
        next(err);
    }
}

const getFavouriteMovies = (_req, res, next) => {
    try {
        const movies = movieService.getFavouriteMovies();

        res.status(200).json({
            data: movies
        });

    } catch (err) {
        next(err);
    }
}

const getMovieByID = (req, res, next) => {
    try {
        const { id } = req.params;

        const movie = movieService.getMovieByID(id);

        res.status(200).json({
            data: movie
        });

    } catch (err) {
        next(err);
    }
}

const addMovieToFavourites = ((req, res, next) => {
    try {
        const id = req.params.id;
        const newMovie = movieService.addMovieToFavourites(Number(id));

        res.status(200).json({
            data: newMovie
        });

    } catch (err) {
        next(err);
    }
});

module.exports = {
    getMoviesBySort,
    getFavouriteMovies,
    getMovieByID,
    addMovieToFavourites
}