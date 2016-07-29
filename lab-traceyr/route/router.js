'use strict';
// require('./model/constructor');
const Router = require('express').Router;
const appErr = require('../model/app_err_handle');
const Coffee = require('../model/coffee_const.js');
const debug = require('debug');
const bodyParser = require('body-parser').json();

let router = new Router();

let coffeeObj = {};

router.post('/coffee', bodyParser, (req, res) =>{
  console.log(!req.body.name);
  if(!req.body.name) return res.sendError(appErr.error400('bad request'));
  let coffee = new Coffee(req.body.name);
  coffeeObj[coffee.id] = coffee;
  console.log(coffeeObj);
  res.status(200).json(coffee);
});
//
// router.get();
//
// router.put();
//
// router.delete();

module.exports = exports = router;
