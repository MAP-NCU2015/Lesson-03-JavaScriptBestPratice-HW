var Test = function(){};
Test.prototype.sub = function (num1,num2){
	return num1-num2;
}

  describe('sub', function(){
    it('sub', function(){
	  var test = new Test();
      assert.equal('1', test.sub(2, 1));
    })
  })
