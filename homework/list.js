'use strict';

function List() {
  this._listNoteContent = [];
  this._wrapper = document.querySelector('#note-list-wrapper');
	document.addEventListener('DOMContentLoaded', this.start.bind(this));
}

List.prototype.start = function() {
	this.fetchList(this.afterFetch.bind(this));
	window.addEventListener('click', this.onNoteOpen.bind(this));
}

List.prototype.fetchList = function(afterFetch) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://140.115.50.54:8000/demo-list-notes.json', true); // Note: use public IP
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(e) {
		// Watch out: we have a mysterious unknown 'this'.
		if (this.readyState === 4 && this.status === 200) {
			var listData = this.response;
			// The flow ends here.
			afterFetch(listData);
		} else if (this.status !== 200 ){
			// Ignore error in this case.
		}
	};
	xhr.send();
}

List.prototype.afterFetch = function(data) {
	this.updateList(data);
	this.drawList();
	this.preloadFirstNote();
}

List.prototype.updateList = function(list) {
	this._listNoteContent = list;
}

List.prototype.drawList = function() {
	var list = this._listNoteContent;
	var ul = document.createElement('ul');
	ul.id = 'note-title-list';
	var buff = document.createDocumentFragment();
	list.forEach(function(note, i) {
		var li = document.createElement('li');
		li.dataset.noteId = i;
		li.classList.add('note-title');
		li.textContent = note.title;
		// Note: buff is captured, so we now have a
		// little closure naturally.
		buff.appendChild(li);
	});
	ul.appendChild(buff);
	this._wrapper.appendChild(ul);
}

List.prototype.preloadFirstNote = function() {
	if (this._listNoteContent.length !== 0) {
		var content = this._listNoteContent[0];
		window.dispatchEvent(new CustomEvent('note-open',
			{ detail: content }));
	}
}

List.prototype.onNoteOpen = function(event) {
	if (event.target.classList.contains('note-title')) {
		var id = event.target.dataset.noteId;
		var content = this._listNoteContent[id];
		window.dispatchEvent(new CustomEvent('note-open',
			{ detail: content }));
	};
}
var list = new List();
