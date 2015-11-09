'use strict';
describe('Test > ', function() {
    var toDoList, toDoItemReader;
    beforeEach(function() {
	toDoList = new ToDoList();
	toDoItemReader = new ToDoItemReader();
	toDoList._wrapper = document.createElement('div');
	toDoItemReader._wrapper = document.createElement('div');
  });

  it('will test some pure functions', function() {
      toDoItemReader.start();
      toDoList._listNoteContent[0] = {
	  title: "This is an pen",
	  passages: [
	      "This is a pencil",
	      "That is a book"
	  ]
      };
      var onNoteOpenEvent = {
	  target: {
	      dataset: {
		  noteId: 0,
	      },
	      classList: {
		  contains: function(input){
		      return true;
		  }
	      }
	  }
      }
      toDoItemReader._wrapper.innerHTML = "";
      toDoList.handleEvent(onNoteOpenEvent);
      assert.notEqual(toDoItemReader._wrapper.innerHTML, "");
  }.bind(this));
});
