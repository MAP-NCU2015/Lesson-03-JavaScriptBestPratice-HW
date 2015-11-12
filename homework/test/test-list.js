var assert = require('assert');
var add = require('add.js')

describe('Test_add', function() {
  it('will test add function', function(done) {
    // Write any pure function assertion here.
	it('add', function(){
      assert.equal('2', add.add(1, 1));
    })
  });
});