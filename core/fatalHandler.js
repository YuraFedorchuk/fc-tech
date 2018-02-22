'use strict';

const logger    = require('./logger');
const server    = require('./../app');

module.exports = err => {
    logger.error(__filename, 'fatal error', err);
    
    if (server.listening) {
        server.close(() => {
            logger.info(__filename, 'server closed');

            logger.info(__filename, 'process exited with status 1');

            process.exit(1);
        });
    } else {
        process.nextTick(() => {
            logger.info(__filename, 'process exited with status 1');    
            
            process.exit(1);
        });
    }

};