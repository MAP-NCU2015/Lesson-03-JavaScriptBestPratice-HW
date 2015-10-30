'use strict';

(function(exports) {
  
  var TodoContentManager = function() {
  // Will be an element as the list wrapper.
  this._wrapper = document.querySelector('#note-content-wrapper');
};

TodoContentManager.prototype = {
  
  start() {
    window.addEventListener('note-open', function(event) {
      var note = event.detail;
      resetWrapper();
      drawNote(note);
    }).bind(this));
  },

  resetWrapper() {
    this._wrapper.innerHTML = '';
  },

  drawNote(note) {
    var title = note.title;
    var h = document.createElement('h2');
    h.textContent = title;
    var passages = note.passages;
    var buff = document.createDocumentFragment();
    passages.forEach(function(passage) {
      var p = document.createElement('p');
      p.classList.add('note-passage');
      p.textContent = passage;
      buff.appendChild(p);
    });
    this._wrapper.appendChild(h);
    this._wrapper.appendChild(buff);
  }
};

  
  exports.TodoContentManager = TodoContentManager;
})(window);
