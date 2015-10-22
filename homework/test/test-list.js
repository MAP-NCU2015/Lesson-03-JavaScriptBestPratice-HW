describe('Test_sin > ', function() {
  var subject;

  beforeEach(function() {
    subject = new TestManager;
  });

  it('will test the sin function', function(done) {
    // Write any pure function assertion here.
	subject.set(0);
    assert.Equal(subject.sin(), 0);
    done();
  });
});