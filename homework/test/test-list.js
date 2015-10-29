var assert = require('assert');
var Test = function(){};

Test.prototype.add = function (n1,n2){
	return n1+n2;
}

  describe('add', function(){
    it('add', function(){
	  var test = new Test();
      assert.equal('10', test.add(7, 3));
    })
  })