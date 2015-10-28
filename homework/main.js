'use strict';

/**
* Initialize ContentManager and ListManager when DOMContentLoaded
*
* @this {window}
*/
document.addEventListener('DOMContentLoaded', function(event) {
  var contentManager = new ContentManager();
  var listManager = new ListManager();
  contentManager.start();
  listManager.start();
});
