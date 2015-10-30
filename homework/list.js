'use strict';

(function(exports) {

var NoteListManager = function() {
  
  this._listNoteContent = [];
  // Will be an element as the list wrapper.
  this._wrapper = null;
};

NoteListManager.prototype = {

	fetchList(){
		return new Promise((function(resolve, reject){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
			xhr.responseType = 'json';
			xhr.onreadystatechange = function(e) {
				// Watch out: we have a mysterious unknown 'this'.
				if (this.readyState === 4 && this.status === 200) {
					var listData = this.response;
					// The flow ends here.
					resolve(listData);
				} else if (this.status !== 200 ){
					reject('FETCHING FAILED: ' + this.status + ' ' + this.readyState);
				}
			};
			xhr.send();
		}).bind(this))
	},

	drawList() {
		var ul = document.createElement('ul');
		ul.id = 'note-title-list';
		var buff = document.createDocumentFragment();
		this._listNoteContent.forEach(function(note, i) {
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
	},
	
	preloadFirstNote() {
		if (this._listNoteContent.length !== 0) {
			var content = this._listNoteContent[0];
			window.dispatchEvent(new CustomEvent('note-open',
			{ detail: content }));
		}
	},
  
	handleEvent(event) {
		switch (event.type) {
		case 'click':
			this.onNoteOpen(event);
			break;
		}
	},
  
  	onNoteOpen(event) {
		if (event.target.classList.contains('note-title')) {
			var id = event.target.dataset.noteId;
			var content = this._listNoteContent[id];
			window.dispatchEvent(new CustomEvent('note-open',
			{ detail: content }));
		};
	},

	start() {
		// Register the handler .
		window.addEventListener('click', this);
		this._wrapper = document.querySelector('#note-list-wrapper');
		this.fetchList()
		.then((function(response) {
			// First initialization.
			this._listNoteContent = response;
			this.drawList(response);
			this.preloadFirstNote();
		}).bind(this));
	}
};

exports.NoteListManager = NoteListManager;
})(window);

