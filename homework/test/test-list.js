describe('Test ListManager', function() {
  var subject;

  beforeEach(function() {
    subject = new ListManager();
  });

  describe('updateList', function() {
    it('will update the inner list of the manager', function() {
      var manager = subject;
      var dummuyList = [
        { "title": "Inside Japan’s Disposable Housing Market",
          "passages": [
          "In a culture obsessed with newness, no one wants a 'used' home—which makes the Japanese real estate market almost unrecognizable to an American.",
          "The 58-year-old writer, born in a sleepy bayside suburb on the north shore of New York’s Long Island, had lived in the country for more than 15 years. He and his wife, Masako Tsubuku, 57, scoured the home market for something affordable and livable, only to find dilapidated houses that even the real estate agents expected them to demolish and re-build upon."
        ]}
      ];

      manager.updateList(dummuyList);

      assert.equal(subject._listNoteContent, dummuyList);
    });
  });
});
