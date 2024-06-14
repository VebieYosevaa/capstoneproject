const axios = require('axios');

const getMovieRecommendations = async (genres) => {
    const apiKey = process.env.TMDB_API_KEY;
    const genreString = genres.join(',');

    const response = await axios.get(`https://api.themoviedb.org/3`, {
        params: {
            api_key: apiKey,
            with_genres: genreString,
        },
    });

    const movies = response.data.results.map(movie => ({
        movieName: movie.title,
        genre: genres.find(genre => movie.genre_ids.includes(genre)),
    }));

    return movies;
};

module.exports = getMovieRecommendations;
