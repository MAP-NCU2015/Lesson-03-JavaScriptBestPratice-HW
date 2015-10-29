describe('Test ToDoListManager ', function() {
  var subject;
  beforeEach(function() {
      subject = new ToDoListManager();
  });

  it('will test some pure functions', function() {
    var test = subject;
    var sum = test.puerFunction(1,1);
    assert.equal(sum,2,'It is equal to 2!');
  });
});
