'use strict';

(function (exports) {
    /**
     * Declare wrapper.
     *
     * @constructor
     * @this {TodoContentManager}
     */
    var TodoContentManager = function () {
        this._wrapper = null;
    }
    TodoContentManager.prototype = {
        /**
         * Initiate wrapper.
         * Add a event listener to listen to note-open event
         *
         * @this {TodoContentManager}
         */
        start() {
            this._wrapper = document.querySelector('#note-content-wrapper');
            window.addEventListener('note-open', this);
        },
        /**
         * Handle event
         *
         *  @param{object} event - custom event :'note-open' 
         *                          , fire when note is opened.
         *  @this{TodoContentManager}
         */
        handleEvent(event) {
            switch (event.type) {
                case 'note-open':
                    var note = event.detail;
                    this.resetWrapper();
                    this.drawNote(note);
                    break;
            }
        },
        /**
         * Reset the wrapper.
         *
         * @this {TodoContentManager}
         */
        resetWrapper() {
            this._wrapper.innerHTML = '';
        },
        /**
         * Draw and add the note on wrapper.
         *
         * @param{object} note- note to be drawed
         * @this{TodoContentManager}
         */
        drawNote(note) {
            var title = note.title;
            var h = document.createElement('h2');
            h.textContent = title;
            var passages = note.passages;
            var buff = document.createDocumentFragment();
            passages.forEach(function (passage) {
                var p = document.createElement('p');
                p.classList.add('note-passage');
                p.textContent = passage;
                buff.appendChild(p);
            });
            this._wrapper.appendChild(h);
            this._wrapper.appendChild(buff);
        }
    };
    exports.TodoContentManager = TodoContentManager;
})(window);
