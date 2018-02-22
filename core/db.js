'use strict';

const mongoose = require('mongoose');
const config = require('../config').db;
const logger = require('./logger');

const init = () => {
    mongoose.connect(config.url);

    logger.info(__filename, 'db init success')    
};

module.exports = init();
