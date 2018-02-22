'use strict';

const uuidv4        = require('uuid/v4');
const { isEmpty }   = require('util');
const db            = require('./../core/db');
const logger        = require('./../core/logger');
const { Cache }     = require('./../models');


const api = {
    getKeys: () => {
        return new Promise((resolve, reject) => {
            Cache.find({})
                .then(res => {
                    console.log(res);
                    if (res.length === 0) {
                        resolve(res);
                    }
                    resolve(res.map(e => e.cache));
                })
                .catch(reject)
        });
    },
    deleteKeys: () => {
        return new Promise((resolve, reject) => {
            Cache.remove()
                .then(() => resolve('keys removed'))
                .catch(reject);
        });
    },
    getKey: (key) => {
        return new Promise((resolve, reject) => {
            Cache.findOne({key: key})
                .then(keyData => {
                    if (!keyData) {
                        logger.info(__filename, 'Cache miss');
                        
                        new Cache({
                            key: key,
                            cache: uuidv4()
                        }).save()
                            .then(newKeyData => resolve(newKeyData.cache))
                            .catch(reject);

                    } else {
                        logger.info(__filename, 'Cache hit');

                        Cache.update({ key: key }, {
                            createdAt: Date.now()
                        })
                        .then(() => resolve(keyData.cache))
                        .catch(reject);
                    }
                })
                .catch(reject);
        });

    },
    postKey: (key, cache) => {
        return new Promise((resolve, reject) => {
            Cache.update({ key: key }, {
                key: key,
                cache: cache,
                createdAt: Date.now()
            }, { upsert: true })
                .then(() => resolve(`key ${key} updated`))
                .catch(reject);
        });
    },
    deleteKey: (key) => {
        return new Promise((resolve, reject) => {
            Cache.remove({ key: key })
                .then(() => resolve(`key ${key} removed`))
                .catch(reject);
        });
    }
};

module.exports = api;