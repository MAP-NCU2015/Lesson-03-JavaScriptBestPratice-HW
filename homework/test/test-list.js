    var test = require('unit.js');
	describe('Test > ', function() {
	  beforeEach(function() {
	  });

	  it('will test some pure functions', function() {
        var example = 'hello world';
		var x = 5;
		var y = 2;
        test
          .string(example)
            .contains('hello')
        ;
      });
    });