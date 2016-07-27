'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const server = require('../server');

describe('initial setup correct', function(){
  beforeEach(function(done){
    server.listen('localhost:3000', done);
  });
  after(function(done){
    server.close(done);
  });
  it('test', function(){
    expect(true).to.eql(true);
  });
});
