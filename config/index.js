'use strict';

require('dotenv-safe').load();

module.exports = {
    defaultPort: 3000,
    db: {
        url: 'mongodb://localhost:27017/app_db'
    },
    ttl: 1000*60*10, // default ttl for cache is 10 minutes
    cacheSize: 10
};