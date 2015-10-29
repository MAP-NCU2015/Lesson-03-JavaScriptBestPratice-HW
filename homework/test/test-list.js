describe('Test > ', function() {
  var sub;
  beforeEach(function() {
    sub = new ContentManager();
  });

  it('test reset wrapper', function() {
    // Write any pure function assertion here.
    sub._wrapper = document.createElement('p');
    sub._wrapper.innerHTML = "G_G";
    sub.resetWrapper();
    assert.equal(sub._wrapper.innerHTML , "" ,"Fail！")
  });
});
