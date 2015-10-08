'use strict';

(function(exports) {

  var ContentManager = function() {
    this._wrapper = document.querySelector('#note-content-wrapper');
  }

  ContentManager.prototype = {

    start() {
      window.addEventListener('note-open', (function(event) {
        var note = event.detail;
        this.resetWrapper();
        this.drawNote(note);
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
      for(var passage of passages) {
        var p = document.createElement('p');
        p.classList.add('note-passage');
        p.textContent = passage;
        buff.appendChild(p);
      }
      this._wrapper.appendChild(h);
      this._wrapper.appendChild(buff);
    }
  };

  exports.ContentManager = ContentManager;
})(window);
