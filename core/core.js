const api           = require('./../api');
const logger        = require('./logger');
const processFatal  = require('./fatalHandler');


process.on('uncaughtException', processFatal);
process.on('unhandledRejection', processFatal);
process.on('SIGINT', processFatal);