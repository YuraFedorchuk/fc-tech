'use strict';

const logger = require('./../core/logger');

module.exports = {
    requestLogger: (req, res, next) => {
        logger.info(__filename, `Request to url=${req.url}, Method: \
${req.method}`, req.body);
        next();
    },
    responseLogger: (req, res, next) => {
        logger.info(__filename, `Response: statusCode=${res.statusCode} \
headers=${res.headers}`);
        next();
    }
};