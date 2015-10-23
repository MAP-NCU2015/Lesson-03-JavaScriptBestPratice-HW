	describe('Test > ', function() {
	  beforeEach(function() {
	  });

	var assert = require("assert");
	  it('will test sin', function() {
		assert.equal(Math.sin(0), 0);
      });
	  it('test function', function() {
		var manager = new Manager();
		assert.equal('2', manager.add(1, 1));
	  })
    });
	var Manager = function() {};
	Manager.prototype.add = function(num1, num2){
		return num1 + num2;
	}
