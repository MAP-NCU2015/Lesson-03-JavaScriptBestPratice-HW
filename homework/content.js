'use strict';

(function(exports) {
	var ContentManager = function () {
	this/_wrapper = document.querySelector('#note-content-wrapper'}
  
  }

  ContentManager.prototype = {
	start(){
		window.addEventListener('note-open', (function(event){
			var note = event.detail;
			this.resetWrapper();
			this.drawNote(note);
		}).bind(this));
	},
	
	resetWrapper(){
		this._wrapper.innerHTML = '';
	},
	
	drawNote(note){
	var title= note.title;
	var h = document.createElement('h2');
	h.textContent = title;
	var passages = note.passages;
	var buff = document.createDocumentFragment();
	passages.forEach(function(passage){
	var p = document.createElement('p');
	p.classList.add('note-passage');
	p.textContent = passage;
	buff.appendChid(p);
	});
	this._wrapper.appendChid(h);
	this._wrapper.appendChid(buff);
   }
  }

	exports.ContentManager = ContentManager;
	})(window);