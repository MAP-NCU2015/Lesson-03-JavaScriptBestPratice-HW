'use strict';
document.addEventListener('DOMContentLoaded', function(event){
	var todolistmanager = new TodoListManager();
	var todocontentmanager = new TodoContentManager();
	todolistmanager.start();
	todocontentmanager.start();
});