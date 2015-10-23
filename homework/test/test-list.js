describe('Test > ', function() {
  beforeEach(function() {
  });

  it('My pure function sin suc', function() {
    // Write any pure function assertion here.
    assert.equal(Math.sin(Math.PI / 2), 1);
  });

  it('My pure function sin failed', function () {
    // Write any pure function assertion here.
    assert.equal(Math.sin(Math.PI / 2), 0);
  });

});
