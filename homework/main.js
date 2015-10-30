'use strict';

  // Kick off
document.addEventListener('DOMContentLoaded', function(event) {
  var noteContentManager = new NoteContentManager();
  var noteListManager = new NoteListManager();
  noteContentManager.start();
  noteListManager.start();
});
