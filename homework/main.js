'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
  var listManager = new ListManager();
  var contentManager = new ContentManager();
  listManager.start();
  contentManager.start();
});
