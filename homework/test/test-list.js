describe('Test ListManager getFahrenheit', function() {
  var listManager = new ListManager();

  it('would calculate correct degree in Fahrenheit scale', function() {
    // Write any pure function assertion here.
    assert.equal(32.000, listManager.getFahrenheit(0));
    assert.equal(51.800, listManager.getFahrenheit(11));
    assert.equal(138.200, listManager.getFahrenheit(59.000));
  });
});
