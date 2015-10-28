'use strict'

	// Kick off
document.addEventListener('DOMContentLoaded',function(event){
	var contentManager = new ContentManager();
	var listManager = new ListManager();
	contentManager.start();
	listManager.start();
});
