'use strict';

const express = require('express');
const router = express.Router();

/*** routes for this service ***/
router.get('/twitterTrends', require('./twitterTrends.js').getTrendsDataRoute);

module.exports = router;
