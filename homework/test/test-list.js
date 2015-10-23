describe('Test > ', function() {
  var subject;
  var List = [];
  beforeEach(function() {
    subject = new list();
    List[1] = "A";
  });

  it('Test changelist', function() {
    subject.updateList(List);
    assert.equal(subject._listNoteContent[1], "A", "Failed!");
  });
});
