describe('Test > ', function() {
  var subject;

  beforeEach(function() {
    subject = new TestManager;
  });

  it('will test some pure functions', function(done) {
    // Write any pure function assertion here.
    subject.set(3, 5);
    assert.deepEqual(subject.add(), 3+5);
    done();
  });
});
