'+'use strict';

 // Kick off
document.addEventListener('DOMContentLoaded', function(event) {
  var listNote = new ListNote();
  var contentManager = new ContentManager();
  listNote.start();
  contentManager.start();
});
