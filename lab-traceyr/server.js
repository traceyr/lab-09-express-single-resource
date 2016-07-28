'use strict';

const express = require('express');
let app = express();
let router = require('./route/router');

app.use('/api', router);

module.exports = exports = app.listen(3002, function() {
  console.log('Server is On');
});
