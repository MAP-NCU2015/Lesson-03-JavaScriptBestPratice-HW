'use strict';

(function(exports) {
	
	/**
	 *Creates an instance of TodoListManager.
	 *
	 *@constructor
	 *@this {TodoListManager}
	 */
    var TodoListManager = function() {
        /** @private */this._listNoteContent = [];
        /** @private */this._wrapper = null;
    };

	/**
	 *Write down the list.
	 *
	 *@this {TodoListManager}
	 */
    TodoListManager.prototype.drawList = function() {
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
    };

	/**
	 *While opening a note, here will be done.
	 *
	 *@param {object}
	 *@this {TodoListManager}
	 */
    TodoListManager.prototype.onNoteOpen = function(event) {
        if (event.target.classList.contains('note-title')) {
            var id = event.target.dataset.noteId;
            var content = this._listNoteContent[id];
            window.dispatchEvent(new CustomEvent('note-open', {
                detail: content
            }));
        };
    };
	
	/**
	 *When the html open, the first/default passage will open.
	 *
	 *@this {TodoListManager}
	 */
    TodoListManager.prototype.preloadFirstNote = function() {
        if (this._listNoteContent.length !== 0) {
            var content = this._listNoteContent[0];
            window.dispatchEvent(new CustomEvent('note-open', {
                detail: content
            }));
        }
    };
	
	/**
	 *To store the list data.
	 *
	 *@param {string} the list data.
	 *@this {TodoListManager}
	 */
    TodoListManager.prototype.updateList = function(list) {
        this._listNoteContent = list;
    };

	/**
	 *To get the data(passage) from demo-list-notes.json.
	 *
	 *@return {Promise} work flow
	 *@this {TodoListManager}
	 */
    TodoListManager.prototype.fetchList = function(afterFetch) {
        return new Promise((function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            //xhr.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
            xhr.open('GET', 'demo-list-notes.json', true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function(e) {
                // Watch out: we have a mysterious unknown 'this'.
                if (this.readyState === 4 && this.status === 200) {
                    var listData = this.response;
					//The flow ends here.
                    resolve(listData);
                } else if (this.status !== 200) {
                    reject('FETCHING FAILED: ' + this.status + ' ' + this.readyState);
                }
            };
            xhr.send();
        }).bind(this));
    };
	
	/**
	 *Handle the event. On click, change the content.
	 *
	 *@param {object} Only 'click' will happen here.
	 *@this {TodoListManager}
	 */
    TodoListManager.prototype.handleEvent = function(event) {
        switch (event.type) {
            case 'click':
                this.onNoteOpen(event);
                break;
        }
    }
		
	/**
	 *Start here. get the list id.
	 *
	 *@this {TodoListManager}
	 */
    TodoListManager.prototype.start = function() {
        this._wrapper = document.querySelector('#note-list-wrapper')
        this.fetchList()
            .then((function(data) {
                this.updateList(data);
                this.drawList();
                this.preloadFirstNote();
            }).bind(this));
        window.addEventListener('click', this);
    };
    exports.TodoListManager = TodoListManager;
})(window);