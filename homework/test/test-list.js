describe('Test ListManager ', function() {
	var listManager;
  beforeEach(function() {
  	listManager = new ListManager()
  });

  it('will test add function', function() {
    // Write any pure function assertion here.
    var num1 = 2;
    var num2 = 10;
    var sum = listManager.testFunction(num1, num2);
    assert.equal(sum, 12, "Equal to 12");
  });
});
