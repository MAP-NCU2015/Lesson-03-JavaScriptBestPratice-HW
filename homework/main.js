'use strict';
document.addEventListener('DOMContentLoaded', function(event) {
	var contentManger = new ContentManager();
	var listManager = new ListManager();
	contentManger.start();
	listManager.start();
});
