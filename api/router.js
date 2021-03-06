/* global __dirname */

'use strict';

const RequestURLException = require(__dirname + '/RequestURLException');

const express = require('express');
const router = express.Router();

/**
 * IP Tracker
 */
router.get('/api/ip/\*', (request, response, next) => {
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
router.get('/api/ip/\*', require(__dirname + '/ip/app'));

/**
 * Invalid URL
 * @param request
 * @param response
 */
router.get('*', (request, response) => {
   const format = '/api/type|object/action[?param1=value1][&param2=value2][&param3...';
   const samples = [
                      '/api/timestamp/parse?unixtime=1506520175',
                      '/api/ip/track'
                   ];
   const exception = new RequestURLException(format, samples);
   response.json(exception);
});

/**
 * Export router
 */
module.exports = router;
