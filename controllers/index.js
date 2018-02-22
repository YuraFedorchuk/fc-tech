'use strict';

const api    = require('./../api');
const logger = require('./../core/logger');

module.exports = {
    getKeys: (req, res, next) => {
        api.getKeys()
            .then(resp => res.json(resp))
            .catch(next);
    },
    deleteKeys: (req, res, next) => {
        api.deleteKeys()
            .then((resp) => {
                res.send(resp);

                next();
            })
            .catch(next);
    },
    getKey: (req, res, next) => {
        const key = req.params.key;

        if (!key) {
            return next(new Error('No key passed'));
        }

        api.getKey(key)
            .then((data) => {
                res.send(data);

                next();
            })
            .catch(next);
    },
    postKey: (req, res, next) => {
        const key = req.params.key;
        const cache = req.body.cache;

        if (!key || !cache) {
            return next(new Error('Not all params passed'));
        }

        api.postKey(key, cache)
            .then(resp => {
                res.send(resp);

                next();
            })
            .catch(next);
    },
    deleteKey: (req, res, next) => {
        const key = req.params.key;

        if (!key) {
            return next(new Error('No key passed'));
        }

        api.deleteKey(key)
            .then(resp => {
                res.send(resp);

                next();
            })
            .catch(next)
    }
}