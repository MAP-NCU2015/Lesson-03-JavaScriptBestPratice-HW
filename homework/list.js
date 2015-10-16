'use strict';

(function(exports) {
 /**
  *  Creates an instance of NoteListManager
  *  @constructor
  *  @this {NoteListManager}
  *  @
  */
    var NoteListManager = function(){
        this._listNoteContent = [];
        this._wrapper = null;
    };
    NoteListManager.prototype = {
    /**
     * add a eventlistener to listen click event 
     * and initial wrapper
     * and call fetchList to fetech data,
     * after fetch , draw the list
     * 
     * @this {NoteListManager}
     */
        start() {
            window.addEventListener('click',this);
            this._wrapper = document.querySelector('#note-list-wrapper');  
            this.fetchList()
            .then((function(data) {
                this.updateList(data);
                this.drawList();
                this.preloadFirstNote();
            }).bind(this));
        },
        /** 
         * Handle click event.
         * If users click on note-title, call onNoteOpen to handle.
         * @this {NoteListManager}
         * @param {Object} event - mouse click event
         */
        handleEvent(event){
            switch(event.type){
                case 'click':
                    if (event.target.classList.contains('note-title') ) {
                        this.onNoteOpen(event)
                    }
                    break;
            } 
        },
        /**
         * Dispatch a custom event when mouse click at the note-title.
         * Also determine the content to be showed.
         * @this {NoteListManager}
         * @param {Object} event- mouse click event.
         */
        onNoteOpen(event) {
            var id = event.target.dataset.noteId;
            var content = this._listNoteContent[id];
            window.dispatchEvent(new CustomEvent('note-open',
                                                 { detail: content }));
        },
        /**
         * Show the Note for start stage.
         * @this {NoteListManager}
         */
        preloadFirstNote() {
            if (this._listNoteContent.length !== 0) {
                var content = this._listNoteContent[0];
                window.dispatchEvent(new CustomEvent('note-open',
                                                     { detail: content }));
            }
        },
        /**
         * updateList.
         * @this {NoteListManager}
         * @param {array} - list to be updated to _listNoteContent
         */
        updateList(list) {
            this._listNoteContent = list;
        },
        /**
         * Draw the list.
         * @this {NoteListManager}
         */
        drawList() {
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
        },
        /**
         * Fetch Data(note-list) from database,where is localhost.
         * If success,then continue the following flow 
         * else it will reject
         * @this {NoteListManager}
         * @return {Promise}
         */
        fetchList() {
            return new Promise((function(resolve,reject){
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
                xhr.responseType = 'json';
                xhr.onreadystatechange = function(e) {
                    // Watch out: we have a mysterious unknown 'this'.
                    if (this.readyState === 4 && this.status === 200) {
                        var listData = this.response;
                        // The flow ends here.
                        resolve(listData);
                    } else if (this.status !== 200 ){
                        // Ignore error in this case.
                        reject('Something Wrong');
                    }
                };
                xhr.send();
            }).bind(this));
        }, 
        /**
         * Test Function , will add num1 to num2 and return.
         * @param {number,number}
         * @return {number}
         */
        pureFunction(num1,num2){
            return num1+num2;
        }
    };
    exports.NoteListManager = NoteListManager;
})(window);
