describe('Test > ', function() {
  var subject;
  beforeEach(function() {
    subject = new ToDoListManager();
  });

  it('will test some pure functions', function() {
    // Write any pure function assertion here.
    var test = subject;
    var sum = test.puerFunction(1,4);
    assert.equal(sum,5,'It is equal to 5!');
  });
  
  Manager.prototype.puerFunction(a,b){
    return a+b;
  }
});
