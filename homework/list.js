'use strict';
(function(exports) {
	var ListManager = function() {
		this._listNoteContent = [];
		this._wrapper = document.querySelector('#note-list-wrapper');
		document.addEventListener('DOMContentLoaded', this.start.bind(this));
	}

	ListManager.prototype = {
		start() {
			this.fetchList(this.afterFetch.bind(this));
			window.addEventListener('click', this.onNoteOpen.bind(this));
		},
		fetchList(afterFetch) {
			var url = 'http://127.0.0.1:8000/demo-list-notes.json';
			sendXHR(url).then( function onFulfilled(value) {
				afterFetch(value);
			}).catch( function onRejected(error) {
				console.error(error);
			})
		},
		afterFetch(data) {
			this.updateList(data);
			this.drawList();
			this.preloadFirstNote();
		},

		updateList(list) {
			this._listNoteContent = list;
		},

		drawList() {
			var list = this._listNoteContent;
			var ul = document.createElement('ul');
			ul.id = 'note-title-list';
			var buff = document.createDocumentFragment();
			list.forEach(insertItem.bind(buff));
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

function sendXHR(url) {
	return  new Promise(function(resolve, reject) {
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
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
}

function insertItem(element, index) {
	var li = document.createElement('li');
	li.dataset.noteId = index;
	li.classList.add('note-title');
	li.textContent = element.title;
	this.appendChild(li);
}
