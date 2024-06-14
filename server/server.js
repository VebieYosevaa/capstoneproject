const express = require('express');
const routes = require('./routes/routes'); 
const ClientError = require('./errors/ClientError');
const loadModel = require('./services/loadModel');
const { Firestore } = require('@google-cloud/firestore');

const app = express();


const firestore = new Firestore();

app.use(express.json());

app.use(async (req, res, next) => {
    try {
        if (!req.app.locals.model) {
            req.app.locals.model = await loadModel();
        }
        next();
    } catch (error) {
        next(error);
    }
});

app.use(routes); 

app.use((err, req, res, next) => {
    if (err instanceof ClientError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
