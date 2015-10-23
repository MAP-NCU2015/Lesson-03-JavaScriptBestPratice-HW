'use strict';

// Kick off
document.addEventListener('DOMContentLoaded', function (event) {
    var todoListManager = new TodoListManager();
    var todoInputManager = new TodoContentManager();
    todoListManager.start();
    TodoContentManager.start();
});