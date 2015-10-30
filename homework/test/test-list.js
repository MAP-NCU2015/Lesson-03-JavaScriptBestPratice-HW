describe('Test > ', function () {
    beforeEach(function () {
        subject = new TodoListManager();
    });

    it('add', function () {
        assert.equal(2, subject.add(1, 1));
    });
});
