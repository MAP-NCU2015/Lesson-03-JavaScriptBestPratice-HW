'use strict';

function ToDoItemReader() {
  this._wrapper = document.querySelector('#note-content-wrapper');
}
ToDoItemReader.prototype = {
    start: function() {
	window.addEventListener('note-open', this);
    },

    resetWrapper: function() {
	this._wrapper.innerHTML = '';
    },

    drawNote: function(note) {
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
	}.bind(this));
	this._wrapper.appendChild(h);
	this._wrapper.appendChild(buff);
    },

    handleEvent: function(event) {
	var note = event.detail;
	this.resetWrapper();
	this.drawNote(note);
    }
}
document.addEventListener('DOMContentLoaded', function(event) {
    var toDoItemReader = new ToDoItemReader();
    toDoItemReader.start();
});

