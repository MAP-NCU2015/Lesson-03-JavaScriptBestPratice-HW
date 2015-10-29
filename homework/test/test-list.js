describe('Test ListNoteContentManager', function() {
    var subject;
    beforeEach(function() {
        subject = new ListNoteContentManager();
    });
it('Test resetWrapper function', function() {
        // Write any pure function assertion here.
        subject._wrapper = document.createElement('div');
        subject._wrapper.innerHTML = 'Test';
        subject.resetWrapper();
        assert.equal(subject._wrapper.innerHTML, '', "Reset Failed!");
    });
});
