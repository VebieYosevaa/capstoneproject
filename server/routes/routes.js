const express = require('express');
const handler = require('./handler'); 

const router = express.Router();

router.use('/api', handler); 

module.exports = router; 
