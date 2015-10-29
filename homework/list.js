'use strict';
(function(exports) {

  /**
  * Create a instance of the ListManager.
  *
  * @constructor
  */
	var ListManager = function() {
		/** @private */ this._listNoteContent = [];
		/** @private */ this._wrapper = document.querySelector('#note-list-wrapper');
		document.addEventListener('DOMContentLoaded', this.start.bind(this));
	}

	ListManager.prototype = {

		/** Initialize the listManager. */
		start() {
			this.fetchList()
				.then(this.updateList.bind(this))
				.then(this.drawList.bind(this))
				.then(this.preloadFirstNote.bind(this))
				.catch(function(error) {
					console.error(error);
				});
			window.addEventListener('click', this.onNoteOpen.bind(this));
		},

		/**
    * Get List form localhost
    *
    * @return {Promise} A start point of the work flow.
    */
		fetchList(afterFetch) {
			return  new Promise(function(resolve, reject) {
				var req = new XMLHttpRequest();
				req.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
				req.responseType = 'json';
				req.onload = function () {
					if (req.status === 200 )
						resolve(req.response);
				};
				req.onerror = function () {
					reject( new Error(req.statusText));
				};
				req.send();
			});
		},

    /** Update the list */
		updateList(list) {
			this._listNoteContent = list;
		},

		/** Append all list title */
		drawList() {
			var list = this._listNoteContent;
			var ul = document.createElement('ul');
			ul.id = 'note-title-list';
			var buff = document.createDocumentFragment();
			list.forEach(insertItem.bind(buff));
			ul.appendChild(buff);
			this._wrapper.appendChild(ul);
		},

		/** Show first note before user do anything. */
		preloadFirstNote() {
			if (this._listNoteContent.length !== 0) {
				var content = this._listNoteContent[0];
				window.dispatchEvent(new CustomEvent('note-open',
					{ detail: content }));
			}
		},

    /**
    * Trigger 'note-open' event while note opened
    *
    * @this {ListManager}
    * @param {object} event The information such as event source, which is about event.
    */
		onNoteOpen(event) {
			if (event.target.classList.contains('note-title')) {
				var id = event.target.dataset.noteId;
				var content = this._listNoteContent[id];
				window.dispatchEvent(new CustomEvent('note-open',
					{ detail: content }));
			};
		}
	}
	exports.ListManager = ListManager;
})(window);

function insertItem(element, index) {
	var li = document.createElement('li');
	li.dataset.noteId = index;
	li.classList.add('note-title');
	li.textContent = element.title;
	this.appendChild(li);
}
