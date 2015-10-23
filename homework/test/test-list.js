describe('Test TodoListManager ', function () {
    var subject;

    beforeEach(function () {
        subject = new TodoListManager();
    });

    it('Test drawList function', function () {
        subject._wrapper = document.createElement('div');
        subject.drawList();
        assert.isNull(subject._wrapper.querySelector('li'), "The test fail!");
        //use "assert" to check if the result is good or bad
    });
});
