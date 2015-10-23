describe('Test > ', function() {
  beforeEach(function() {
	subject = new TodoListManager();
  });

  it('Can save some data', function(done) {
    var dummyList = [
      {checked: false, description: 'Dummy Todo #1'},
      {checked: true, description: 'Dummy Todo #2'}
    ];
    subject.saveData(dummyList).then(function() {
      assert.deepEqual(subject._listNoteContent, dummyList);
      done();
    }).catch(done);
  });
});
