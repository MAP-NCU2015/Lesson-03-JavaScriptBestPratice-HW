'use strict';

  // Kick off
document.addEventListener('DOMContentLoaded', function(event) {
  var NoteListManager = new NoteListManager();
  var NoteContentManager = new NoteContentManager();
  NoteListManager.start();
  NoteContentManager.start();
});