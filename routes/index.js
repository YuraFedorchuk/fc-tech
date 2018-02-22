const express = require('express');
const router = express.Router();

const ctrl = require('./../controllers');
const {asyncMiddleware} = require('./../middleware');

router.get('/keys', ctrl.getKeys);
router.delete('/keys', ctrl.deleteKeys);
router.get('/keys/:key', ctrl.getKey);
router.post('/keys/:key', ctrl.postKey);
router.delete('/keys/:key', ctrl.deleteKey);

module.exports = router;