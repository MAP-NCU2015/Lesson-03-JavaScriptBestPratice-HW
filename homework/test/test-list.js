var assert = require('assert');

describe('Test Math',function(){
  beforeEach(function() {
  });

  it('Calculate the Maximum num', function() {
    var small = 1;
	var big = 10;
	var maxNumber = Math.max(big,small);
	assert.equal(maxNumber,big);
  });
});
