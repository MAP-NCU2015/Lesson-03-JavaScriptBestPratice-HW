'use strict';

(function(exports) {

var NoteContentManager = function() {
	// Will be an element as the content wrapper.
	this._wrapper = null;
};

NoteContentManager.prototype = {
	
	drawNote(note){
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
	},
	
	resetWrapper(){
		this._wrapper.innerHTML = '';
	},
  
	handleEvent(event) {
		switch (event.type) {
			case 'note-open':
				var note = event.detail;
				this.resetWrapper();
				this.drawNote(note);
				break;
		}
	},

  start() {
    window.addEventListener('note-open', this);
    this._wrapper = document.querySelector('#note-content-wrapper');
  }
};

exports.NoteContentManager = NoteContentManager;
})(window);

