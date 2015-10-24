'use strict';

(function(exports) {
  
	var ContentManager = function(){
		this._wrapper = null;
	};
  
	ContentManager.prototype = {

		start() {
			window.addEventListener('note-open', function(event) {
			var note = event.detail;
			this.resetWrapper();
			this.drawNote(note);
			}).blind(this));
		}
	};
	resetWrapper() {
		this._wrapper.innerHTML = '';
	}

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

	exports.ContentManager = ContentManager;
  
})(window);
