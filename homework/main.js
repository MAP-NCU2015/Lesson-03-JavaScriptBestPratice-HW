'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
    var todoContentManager = new TodoContentManager();
    var todoListManager = new TodoListManager();
    todoContentManager.start();
    todoListManager.start();
});
