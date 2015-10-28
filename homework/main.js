'use strict';

// Kick off
document.addEventListener('DOMContentLoaded', function (event) {
    var todoListManager = new TodoListManager();
    var todoContentManager = new TodoContentManager();
    var test = new Test();
    todoListManager.start();
    todoContentManager.start();
});