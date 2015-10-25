'use strict';
(function(exports){
	var ContentManager = function() {
		this._wrapper = document.querySelector('#note-content-wrapper');
		document.addEventListener('DOMContentLoaded', this.start.bind(this));
	}

	ContentManager.prototype = {
		start() {
			window.addEventListener('note-open', this.updateContent.bind(this));
		},

		updateContent(event) {
			var note = event.detail;
			this.resetWrapper();
			this.drawNote(note);
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
	}

	window.ContentManager = ContentManager;
})(window);
