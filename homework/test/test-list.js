describe('Test > ', function() {
  var subject;

  beforeEach(function() {
    subject = new ContentManager();
  });

  it('Test resetWrapper', function() {
    // Write any pure function assertion here.
    subject._wrapper = document.createElement('div');
    subject._wrapper.innerHTML = "XXXX";
    subject.resetWrapper();
    assert.equal(subject._wrapper.innerHTML , "" ,"GG, It's Fail")

  });
});
