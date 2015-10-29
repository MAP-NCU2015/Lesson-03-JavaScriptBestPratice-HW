'use strict';
(function(exports){


  /**
  * Create a instance of contentManager.
  *
  * @constructor
  */
	var ContentManager = function() {
		/** @private */ this._wrapper = document.querySelector('#note-content-wrapper');
		document.addEventListener('DOMContentLoaded', this.start.bind(this));
	}

	ContentManager.prototype = {

    /** Initialization */
		start() {
			window.addEventListener('note-open', this.updateContent.bind(this));
		},

		/** Update note wrapper's content */
		updateContent(event) {
			var note = event.detail;
			this.resetWrapper();
			this.drawNote(note);
		},

		/** Clear the note wrapper */
		resetWrapper() {
			this._wrapper.innerHTML = '';
		},

		/** set content on wrapper */
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
