'use strict';
//kick off

document.addEventListener('DOMContentLoaded',function(event){
	var ListNote = new ListNote();
	var ContentManager = new ContentManager();
	ListNote.start();
	ContentManager.start();
})