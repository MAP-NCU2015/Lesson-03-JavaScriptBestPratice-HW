document.addEventListener('DOMContentLoaded', function(event) {
	var todoListManager = new TodoListManager();
	var noteContentManager = new NoteContentManager();
	todoListManager.start();
	noteContentManager.start();
});