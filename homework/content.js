'use strict';


(function() {
	function contentObject() {
			this._wrapper = document.querySelector('#note-content-wrapper');
	}

  contentObject.prototype.start = function() {
    window.addEventListener('note-open', function(event) {
      var note = event.detail;      
      this.resetWrapper();
      this.drawNote(note);
    }.bind(this));
  }

  contentObject.prototype.resetWrapper = function() {
    this._wrapper.innerHTML = '';
  }

  contentObject.prototype.drawNote = function(note) {
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

  document.addEventListener('DOMContentLoaded', function(event) {
    var start = new contentObject();
    start.start();
  });
})();
