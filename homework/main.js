'use strict';

// Kick off
document.addEventListener('DOMContentLoaded', function (event) {
    var todoListManager = new TodoListManager();
    var todoContentManager = new TodoContentManager();
    todoListManager.start();
    todoContentManager.start();
});