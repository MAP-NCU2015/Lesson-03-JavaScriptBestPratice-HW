'use strict';

document.addEventListener('DOMContentLoaded',function(event){
  var  ToDoContentManager = new ToDoContentManager();
  var  ToDoListManager = new ToDoListManager();
  ToDoContentManager.start();
  ToDoListManager.start();
});
