'use strict';

const mongoose  = require('mongoose');
const config    = require('./../config');

const cacheSchema = new mongoose.Schema({
    key: { type: String, required: true },
    cache: { type: String, required: true },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: config.ttl 
    }
});

const Cache = mongoose.model('Cache', cacheSchema);

exports.Cache = Cache;