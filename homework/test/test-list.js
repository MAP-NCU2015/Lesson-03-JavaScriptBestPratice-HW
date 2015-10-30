describe('Test Math', function () {
    var testAdd;
    beforeEach(function () {
        testAdd = new Content();
  });

  it('can test addition', function() {
      var sum = testAdd.addition(5, 5);
      assert.equal(sum, 5 + 5);
  });
});
