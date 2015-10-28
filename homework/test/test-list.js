
describe('Test Math', function() {

  var contentManager;

  beforeEach(function() {
    contentManager = new ContentManager();
  });

  it('can calculate the max number', function() {
    var big   = 10;
    var small = 5;
    var maxNumber = contentManager.calculateMaxNumber( big, small );
    assert.equal( maxNumber, big );
  });
});
