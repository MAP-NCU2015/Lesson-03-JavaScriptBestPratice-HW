'use strict';

(function(exports) {
    /**
     * Initiate wrapper.
     * @constructor
     * @this {NoteContentManager}
     *
     */
    var NoteContentManager = function(){
        this._wrapper=null;    
    }
    NoteContentManager.prototype={
        /**
         * Add a event listener to listen to note-open event
         * @this {NoteContentManager}
         *
         */
        start() {
            this._wrapper = document.querySelector('#note-content-wrapper');
            window.addEventListener('note-open', this );
        },
        /**
         * Clean the wrapper.
         * @this {NoteContentManager}
         */
        resetWrapper() {
            this._wrapper.innerHTML = '';
        },
        /**
         * Handle event
         *  @param{object} event - custom event :'note-open' 
         *                          , fire when note is opened. 
         *  @this{NoteContentManager}
         */
        handleEvent(event){
            switch(event.type){
                case 'note-open':
                    var note = event.detail;
                    this.resetWrapper();
                    this.drawNote(note);
                    break;
            }
        },
        /**
         * Draw the note on wrapper.
         *
         * @param{object} note- note to be drawed
         * @this{NoteContentManager}
         */
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
    exports.NoteContentManager=NoteContentManager;
})(window);
