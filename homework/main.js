'use strict';

// Kick off
document.addEventListener('DOMContentLoaded', function (event) {
    var todoListManager = new TodoListManager();
    var contentmanager = new Contentmanager();
    todoListManager.start();
    contentmanager.start();
});