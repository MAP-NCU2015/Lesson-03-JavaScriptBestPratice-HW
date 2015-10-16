'use strict'
/**
 * kickoff when Document is fully loaded
 */
document.addEventListener('DOMContentLoaded',function(event){
    var noteListManager = new NoteListManager();
    var noteContentManager = new NoteContentManager();
    noteListManager.start();
    noteContentManager.start();
});
