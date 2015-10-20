'use strict';

  // Kick off
document.addEventListener('DOMContentLoaded', function(event) {
  var listNoteManager = new ListNoteManager();
  var contentManager = new ContentManager();
  listNoteManager.start();
  contentManager.start();
});
