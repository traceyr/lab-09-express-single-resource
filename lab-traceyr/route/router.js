'use strict';

const Router = require('express').Router;
const appErr = require('../model/app_err_handle');
const Coffee = require('../model/coffee_const.js');
const bodyParser = require('body-parser').json();

let router = new Router();

let coffeeObj = {
  1234:{
    id: 1234,
    name: 'cappuchino',
    createDate: 1020456
  },
  4567:{
    id: 4567,
    name: 'mocha',
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
  if(!coffeeObj[req.params.id]){
    return res.sendError(appErr.error404('not an id'));
  }
  if(coffeeObj[req.params.id]){
    console.log('Found drink');
    return res.status(200).json(coffeeObj[req.params.id]);
  }
});

router.put('/coffee/:id', bodyParser, (req, res) =>{
  if(!coffeeObj[req.params.id]){
    return res.sendError(appErr.error400('no body'));
  }
  if(coffeeObj[req.params.id]){
    coffeeObj[req.params.id].name = req.body.name;
    console.log('name updated');
    return res.status(200).json(coffeeObj[req.params.id]);
  }
});

router.delete('/coffee/:id', (req, res) =>{
  if(!coffeeObj[req.params.id]){
    return res.sendError(appErr.error400('no body'));
  }
  if(coffeeObj[req.params.id]){
    delete coffeeObj[req.params.id];
    return res.status(200).json(coffeeObj);
  }
});

module.exports = exports = router;
