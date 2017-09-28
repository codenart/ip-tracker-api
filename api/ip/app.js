/* global __dirname */

'use strict';

const RequestURLException = require(__dirname + '/../RequestURLException');
const APIException = require(__dirname + '/../APIException');
const Checker = require('type-check');

const express = require('express');
const app = express();

/**
 * Parse request header
 * @param request
 * @param response
 */
app.get('/api/ip/track', (request, response) => {
   var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
       ip = ip.split(',')[0];
   var lang = request.headers['accept-language'];
       lang = lang.split(',')[0];
   var software = request.headers['user-agent'];
       software = software.replace(/(^.+\()(.+)(\).+$)/, '$2');
       
   const result = {
      'ip-address': ip,
      'language'  : lang,
      'software'  : software
   };
   response.json( result );
});

/**
 * Invalid URL
 * @param request
 * @param response
 */
app.get('*', (request, response) => {
   const format = '/api/ip/track';
   const samples = ['/api/ip/track'];
   const exception = new RequestURLException(format, samples);
   response.json(exception);
});

/**
 * Export app
 */
module.exports = app;
