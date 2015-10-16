describe('Test NoteListManager ', function() {
    var subject;
  beforeEach(function() {
      subject=new NoteListManager();
  });

  it('will test some pure functions', function() {
    var manager = subject;
    var result=manager.pureFunction(3,4);
    assert.equal(result,7,'is it equal to 7');
  });
});
