const express = require('express');
const crypto = require('crypto');
const recommendMovies = require('../services/recommendationService');
const storeData = require('../services/storeData');
const InputError = require('../errors/InputError');

const router = express.Router();

router.post('/recommend', async (req, res, next) => {
    try {
        const { genres } = req.body;
        if (!genres || !Array.isArray(genres)) {
            throw new InputError('Genres must be provided as an array for movie recommendations');
        }

        const { model } = req.app.locals;

        const { movieName, genre } = await recommendMovies(model, genres);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            id,
            name: movieName,
            genre,
            createdAt
        };

        await storeData(id, data);

        res.status(201).json({
            status: 'success',
            message: 'Movie recommendations generated successfully',
            data
        });

    } catch (error) {
        if (error instanceof InputError) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
        console.error('Recommendation Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed generating movie recommendations'
        });
    }
});

module.exports = router;
