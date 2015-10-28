describe('Test ListManager', function() {
  var subject;

  beforeEach(function() {
    subject = new ListManager();
  });

  describe('updateList',function(){
	it('will update the inner list of the manager', function(){
		var manager = subject;
		var dummuyList = [
			{ "title": "US signals shift in Syria-Iraq campaign against Islamic State",
			  "passages": [
			  "The US has indicated a shift in its campaign against Islamic State (IS) militants in Iraq and Syria, including the use of direct ground raids.",
			  "Defence Secretary Ash Carter said there would also be more air strikes against high-value targets."
			]}
		];

		manager.updateList(dummuyList);

		assert.equal(subject._listNoteContent, dummyList);
	});
  });
});
