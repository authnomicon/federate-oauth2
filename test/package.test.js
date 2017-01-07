/* global describe, it */

var expect = require('chai').expect;
var pkg = require('..');


describe('@authnomicon/sso-oauth2', function() {
  
  it('should export manifest', function() {
    expect(pkg).to.be.an('object');
    expect(pkg['statestore']).to.be.a('function');
  });
  
  describe('statestore', function() {
    var statestore = pkg['statestore'];
    
    it('should be annotated', function() {
      expect(statestore['@implements']).to.equal('http://schemas.authnomicon.org/js/sso/oauth2/StateStore');
      expect(statestore['@singleton']).to.equal(true);
    });
  });
  
});
