var MathFunc=function(){};

MathFunc.prototype  = {

        addNumber: function(a,b){
                return (a+b);
        }
};


var assert= require("assert");
describe('Test > ', function() {
  beforeEach(function() {
        mathFunc = new MathFunc();
  });

  it('will add two numbers', function() {
     assert.equal(16,mathFunc.addNumber(15, 1));

    // Write any pure function assertion here.
  });
});


