describe('Test NoteListManager ', function() {

  beforeEach(function() {
  	test = new NoteListManager();
  });

  it('will test updateList functions', function() {
    // Write any pure function assertion here.{
  	var dummyList = [
    	{ "title": "Indian 'mystery woman' Geeta says family not hers",
          "passages": [
          "An Indian woman who was stranded in Pakistan for a decade has returned home, but says the family she had identified in photos is not hers.",
          "India's Foreign Minister Sushma Swaraj said the woman, named Geeta, is refusing to recognise her family.",
          "Geeta arrived in Delhi on Monday morning, days after she identified her family in photos sent from India."
        ]}
	];

	test.updateList(dummuyList);

	assert.equal(test._listNoteContent, dummuyList);
   });
});
