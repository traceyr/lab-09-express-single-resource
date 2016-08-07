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
    request(server)
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
    request(server)
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

  it('should return a 200 for GET', function(done){
    request(server)
      .get('/api/coffee/4567')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.have.string('mocha');
        done();
      });
  });

  it('should return a 400 for GET', function(done){
    request(server)
      .get('/api/coffee')
      .end(function(err, res){
        expect(res.status).to.eql(400);
        expect(res.text).to.have.string('bad request');
        done();
      });
  });

  it('should return a 404 for GET', function(done){
    request(server)
      .get('/api/coffee/6543')
      .end(function(err, res){
        expect(res.status).to.eql(404);
        expect(res.text).to.have.string('not found');
        done();
      });
  });

  it('should return a 400 for PUT', function(done){
    request(server)
      .put('/api/coffee/3211?name=ralph')
      .end(function(err, res){
        expect(res.status).to.eql(400);
        expect(res.text).to.have.string('bad request');
        done();
      });
  });

  it('should return a 200 for PUT', function(done){
    request(server)
      .put('/api/coffee/1234')
      .send({name: 'tea'})
      .end(function(err, res){
        expect(res.status).to.eql(200);
        expect(res.text).to.have.string('tea');
        done();
      });
  });

});
