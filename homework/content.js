'use strict';

(function(exports) {
	var NoteContentManager = function() {
		this._wrapper = document.querySelector('#note-content-wrapper');
	};

	NoteContentManager.prototype = {
		start() {
			window.addEventListener('note-open', function(event) {
			  var note = event.detail;
			  this.resetWrapper()
			  .then((function(){
					this.drawNote(note);
			  }).bind(this));
			}.bind(this));
		},
		
		resetWrapper() {
			  this._wrapper.innerHTML = '';
			  return Promise.resolve();
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
	
	};
	
	exports.NoteContentManager = NoteContentManager;

})(window);
