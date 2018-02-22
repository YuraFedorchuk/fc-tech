const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();

const logger        = require('./core/logger');
const core          = require('./core/core');
const config        = require('./config');
const router        = require('./routes');

const { requestLogger,
        responseLogger } = require('./middleware');


const PORT = process.env.PORT || config.defaultPort;

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

app.use(bodyParser.json());

app.use(requestLogger);
app.use(router);
app.use(responseLogger);

module.exports = app.listen(PORT, 
    logger.info.bind(logger, __filename, `Server running on ${PORT}`)
);

const processFatal = require('./core/fatalHandler');

app.use((err, req, res, next) => {
    res.status(500).end('Internal Server Error');

    processFatal(err);

    next();
});
