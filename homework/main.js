'use strict';

// Kick off
document.addEventListener('DOMContentLoaded', function(event) {
    var listNoteManager = new ListNoteManager();
    var listNoteContentManager = new ListNoteContentManager();
    listNoteContentManager.start();
    listNoteManager.start();
});
