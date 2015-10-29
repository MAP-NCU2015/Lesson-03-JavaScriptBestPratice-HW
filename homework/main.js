'use strict';
document.addEventListener('DOMContentLoaded', function(event){
	var listmanager = new ListManager();
	var contentmanager = new ContentManager();
	listmanager.start();
	contentmanager.start();
});