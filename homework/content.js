'use strict';

(function() {
  var _wrapper = document.querySelector('#note-content-wrapper');

  function start() {
		// 'note-open' will be triggered at list.js
    window.addEventListener('note-open', function(event) {
      var note = event.detail;
      resetWrapper();
      drawNote(note);
    });
  }

	/** Clear content container for the new one */
  function resetWrapper() {
    _wrapper.innerHTML = '';
  }

	/** Append the new one */
  function drawNote(note) {
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
    _wrapper.appendChild(h);
    _wrapper.appendChild(buff);
  }

	/** which start() will be executed first? */
  document.addEventListener('DOMContentLoaded', function(event) {
    start();
  });
})();
