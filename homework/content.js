'use strict';

function Note() {
  this._wrapper = document.querySelector('#note-content-wrapper');
  document.addEventListener('DOMContentLoaded', this.start.bind(this));
}

Note.prototype.start = function() {
	// 'note-open' will be triggered at list.js
	window.addEventListener('note-open', this.updateContent.bind(this));
}

Note.prototype.updateContent = function(event) {
	var note = event.detail;
	this.resetWrapper();
	this.drawNote(note);
}

Note.prototype.resetWrapper = function() {
	this._wrapper.innerHTML = '';
}

Note.prototype.drawNote = function(note) {
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

var note = new Note();
