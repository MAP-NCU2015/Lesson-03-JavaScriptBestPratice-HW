'use strict';

(function (exports) {
    /**
     *  Declare _listNoteContent.
     *  Declare wrapper.
     *
     *  @constructor
     *  @this {TodoListManager}
     */
    var TodoListManager = function () {
        // Local data storage; should sync up with the server.
        this._listNoteContent = [];
        // Will be an element as the list wrapper.
        this._wrapper = null;
    };
    TodoListManager.prototype = {
        /**
         * Initial wrapper
         * Add a eventlistener to listen click event 
         * Call fetchList to fetech data,
         * after fetch , draw the list
         * 
         * @this {TodoListManager}
         */
        start() {
            this._wrapper = document.querySelector('#note-list-wrapper');
            window.addEventListener('click', this);
            this.fetchList().then((function (data) {
                this.updateList(data);
                this.drawList();
                this.preloadFirstNote();
            }).bind(this))
        },
        /**
         * Dispatch a custom event when mouse click at the note-title.
         * Also determine the content to be showed.
         *
         * @param {Object} event- mouse click event.
         * @this {TodoListManager}
         */
        onNoteOpen(event) {
            if (event.target.classList.contains('note-title')) {
                var id = event.target.dataset.noteId;
                var content = this._listNoteContent[id];
                window.dispatchEvent(new CustomEvent('note-open',
                  { detail: content }));
            };
        },
        /** 
         * Handle click event.
         * If users click on note-title, call onNoteOpen to handle.
         *
         * @param {Object} event - mouse click event
         * @this {TodoListManager}
         */
        handleEvent(event) {
            switch (event.type) {
                case 'click':
                    this.onNoteOpen(event);
                    break;
            }
        },
        /**
         * Show the Note for start stage.
         *
         * @this {TodoListManager}
         */
        preloadFirstNote() {
            if (this._listNoteContent.length !== 0) {
                var content = this._listNoteContent[0];
                window.dispatchEvent(new CustomEvent('note-open',
                  { detail: content }));
            }
        },
        /**
         * Update List.
         *
         * @param {array} - list to be updated to _listNoteContent
         * @this {TodoListManager}
         */
        updateList(list) {
            this._listNoteContent = list;
        },
        /**
         * Draw the list.
         *
         * @this {TodoListManager}
         */
        drawList() {
            var list = this._listNoteContent;
            var ul = document.createElement('ul');
            ul.id = 'note-title-list';
            var buff = document.createDocumentFragment();
            list.forEach(function (note, i) {
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
        /**
         * Try fetch Data(note-list) from .json,where is localhost.
         * If there is any problem fetch the file direct from same http server as .html file
         * (Because I got some problem to get the file from my system)
         * If success,then continue the following flow 
         * Else it will reject
         *
         * @return {Promise}
         * @this {TodoListManager}
         */
        fetchList() {
            return new Promise((function (yes, no) {
                var xhr = new XMLHttpRequest();
                try {
                    xhr.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
                } catch (exception) {
                    console.log(exception);
                    xhr.open('GET', 'demo-list-notes.json', true);
                }
                xhr.responseType = 'json';
                xhr.onreadystatechange = function (e) {
                    // Watch out: we have a mysterious unknown 'this'.
                    if (this.readyState === 4 && this.status === 200) {
                        var listData = this.response;
                        // The flow ends here.
                        yes(listData);
                    } else if (this.status !== 200) {
                        // Ignore error in this case.
                    }
                };
                xhr.send();
            }).bind(this));
        }
    };
    exports.TodoListManager = TodoListManager;
})(window);
