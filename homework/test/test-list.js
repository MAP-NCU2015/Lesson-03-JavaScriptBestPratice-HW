describe('Test > ', function() {
  beforeEach(function() {
	  subject = new ContentManager();
  });

  it(''Test resetWrapper function', function() {
    // Write any pure function assertion here.
	subject._wrapper = document.createElement('div');
+        subject._wrapper.innerHTML = 'Test';
+        subject.resetWrapper();
+        assert.equal(subject._wrapper.innerHTML, '', "Failed~"
  });
});
