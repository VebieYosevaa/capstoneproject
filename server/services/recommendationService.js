const getMovieRecommendations = require('./tmdbService');

const recommendMovies = async (model, genres) => {
    try {
        const recommendations = await getMovieRecommendations(genres);

        const selectedRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];

        return selectedRecommendation;
    } catch (error) {
        console.error('Error in recommendMovies:', error);
        throw new Error('Movie recommendation failed');
    }
};

module.exports = recommendMovies;
