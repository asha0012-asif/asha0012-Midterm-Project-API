const movies = require("../models/movies");
const favouriteMovies = require("../models/favouriteMovies");

const { NotFoundError, BadRequestError} = require("../utils/errors");

const getImage = (file_size, file_path) =>{
    return `https://image.tmdb.org/t/p/${file_size}${file_path}`;
}

// TO GET FILTERED MOVIES
const getMoviesBySort = (keyword, sort) => {

    // 1. get all movies based on the name
    const filteredMovies = movies.filter(movie => {
        if (movie.title.toLowerCase().includes(keyword.toLowerCase())) {
            return {
                data: movie
            };
        }
    });

    if (!filteredMovies) {
        const destructuredMovies = movies.map(({id, title, poster_path}) => {
            return {
                id,
                title,
                imageUrl: getImage(poster_path)
            }
        });

        return destructuredMovies.slice(0, 10);
    }

    // 2. sort from highest to lowest based on the sorting method (release date, popularity, vote)
    switch (sort) {
        case "release-date":

            // reorder the movies based on release date
            filteredMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

            break;

        case "popularity":

            // reorder the movies based on popularity
            filteredMovies.sort((a, b) => b.popularity - a.popularity);

            break;

        case "vote":

            // reorder the movies based on votes
            filteredMovies.sort((a, b) => b.vote_average - a.vote_average)

            break;

        default:
            break;
    }

    const destructuredMovies = filteredMovies.map(({id, title, poster_path}) => {
        return {
            id,
            title,
            imageUrl: getImage("w92", poster_path)
        }
    });

    // takes the first 10 movies from the filtered list if there are more than 10
    return destructuredMovies.slice(0, 10);
}

const getFavouriteMovies = () => favouriteMovies;

const getMovieByID = (id) => {
    const movie = movies.find(movie => Number(id) === movie.id);

    if (!movie) {
        throw new NotFoundError(`No movies found with an id of ${id}`);
    } else {
        movie.imageUrl = getImage("w780", movie.poster_path);

        return movie;
    }
}

const addMovieToFavourites = (movieID) => {
    const movie = getMovieByID(movieID);

    if (movie) {      
        const favouriteMovie = favouriteMovies.find(favouriteMovie => favouriteMovie.id === movieID);

        if (!favouriteMovie) {
            favouriteMovies.push(movie);
        }
    }

    return movie;
}

module.exports = {
    getMoviesBySort,
    getFavouriteMovies,
    getMovieByID,
    addMovieToFavourites
}