'use strict';
module.exports = exports = function AppError(message, statusCode, responseMessage){
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

let error400 = new AppError('bad request', 400, 'bad request');
let error404 = new AppError('not found', 404, 'not found');
let error500 = new AppError('internal server error', 500, 'internal server error');
