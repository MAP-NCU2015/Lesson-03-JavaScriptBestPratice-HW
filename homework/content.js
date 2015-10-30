'use strict';

(function() {
  var _wrapper = document.querySelector('#note-content-wrapper');

  function start() {
    var con = new content();
    window.addEventListener('note-open', 
	  (function(event) {
        var note = event.detail;
        con.resetWrapper();
        con.drawNote(note);
      }).bind(this));
  }

  con.prototype.function resetWrapper = function() {
    _wrapper.innerHTML = '';
  }

  con.prototype.function drawNote = function(note) {
    var title = note.title;
    var h = document.createElement('h2');
    h.textContent = title;
    var passages = note.passages;
    var buff = document.createDocumentFragment();
    passages.forEach((function(passage) {
      var p = document.createElement('p');
      p.classList.add('note-passage');
      p.textContent = passage;
      buff.appendChild(p);
    }).bind(this));
    _wrapper.appendChild(h);
    _wrapper.appendChild(buff);
  }

  document.addEventListener('DOMContentLoaded', function(event) {
    start();
  });
})();