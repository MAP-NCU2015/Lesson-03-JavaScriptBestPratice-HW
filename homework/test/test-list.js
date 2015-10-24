describe('Test Math.sin', function() {
	var subject;
	
	beforeEach(function() {
		subject = new TestManager;
	});

  it('will test sin function', function() {
    subject.set(Math.PI);
	assertEqual(subject.sin(),0);
	done();
  });
});
