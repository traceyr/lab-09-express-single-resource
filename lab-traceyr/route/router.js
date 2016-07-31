'use strict';
// require('./model/constructor');
const Router = require('express').Router;
const appErr = require('../model/app_err_handle');
const Coffee = require('../model/coffee_const.js');
// const debug = require('debug');
const bodyParser = require('body-parser').json();

let router = new Router();

let coffeeObj = {
  1234:{
    id: 1234,
    name: 'cappuchino',
    createDate: 1020456
  }
};

router.post('/coffee', bodyParser, (req, res) =>{
  console.log(!req.body.name);
  if(!req.body.name) return res.sendError(appErr.error400('bad request, id not found'));
  let coffee = new Coffee(req.body.name);
  coffeeObj[coffee.id] = coffee;
  console.log(coffeeObj);
  return res.status(200).json(coffee);
});

router.get('/coffee', (req, res) =>{
  return res.sendError(appErr.error400('bad request, no id specified'));
});

router.get('/coffee/all', (req, res) =>{
  console.log('sending all drinks');
  return res.status(200).json(coffeeObj);
});

router.get('/coffee/:id', (req, res) =>{
  for(let key in coffeeObj){
    if(key !== req.params.id){
      return res.sendError(appErr.error404('not an id'));
    }
    if(key === req.params.id){
      console.log('Found drink');
      return res.status(200).json(coffeeObj);
    }
  }
});

// router.put();
//
// router.delete();

module.exports = exports = router;
