/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/handlers/return');


describe('handlers/return', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
});
