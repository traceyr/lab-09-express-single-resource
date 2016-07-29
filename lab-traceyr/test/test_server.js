'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const server = require('../server');

describe('Testing', function(){
  after(function(done){
    server.close(done);
  });
  it('should return a 404 for POST', function(done){
    request('localhost:3000')
    .post('/api/coffee')
    .send({
      nothing: 'not right at all'
    })
    .end(function(err, res){
      expect(res.status).to.eql(400);
      expect(res.text).to.have.string('bad request');
      done();
    });
  });
  it('should return a 200 for POST', function(done){
    request('localhost:3000')
    .post('/api/coffee')
    .send({
      name: 'Americano'
    })
    .end(function(err, res){
      expect(res.status).to.eql(200);
      expect(res.text).to.have.string('Americano');
      done();
    });
  });
});
