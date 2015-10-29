'use strict';

  // Kick off
document.addEventListener('DOMContentLoaded', function(event) {
  var listManager = new ListManager();
  var contentManager = new ContentManager();
  listManager.start();
  contentManager.start();
});