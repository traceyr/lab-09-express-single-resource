'use strict';

const express = require('express');
let fs = require('fs');
let path = require('path');
let AppError = require('./model/app_err_handle');
let app = express();
let morgan = require('morgan');
let router = require('./route/router');

let sendError = function(req, res, next){
  res.sendError = function(err){
    if(err){
      console.log(err.message);
      if(AppError.checkForError(err)){
        return res.status(err.statusCode).send(err.responseMessage);
      }
      res.status(500).send('internal server problem');
    }
  };
  next();
};

let accessLogStream = fs.createWriteStream(path.join('./lib/morgan_log'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));
app.use(sendError);
app.use('/api', router);

module.exports = exports = app.listen(3001, function() {
  console.log('Server is On');
});
