'use strict';

(function(exports) {
	
	/**
	 *Creates an instance of TodoContentManager.
	 *
	 *@constructor
	 *@this {TodoContentManager}
	 */
    var TodoContentManager = function() {
        /** @private */this._wrapper = null;
    };

	/**
	 *Clear the Content.
	 *
	 *@this {TodoContentManager}
	 */
    TodoContentManager.prototype.resetWrapper = function() {
        this._wrapper.innerHTML = '';
    };

	/**
	 *Write down the passage in the Content.
	 *
	 *@param {string} note is event.detail which is the passage.
	 *@this {TodoContentManager}
	 */
    TodoContentManager.prototype.drawNote = function(note) {
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
    };

	/**
	 *Handle the event.
	 *
	 *@param {object} Only 'note-open' will happen here.
	 *@this {TodoContentManager}
	 */
    TodoContentManager.prototype.handleEvent = function(event) {
        switch (event.type) {
            case 'note-open':
                var note = event.detail;
                this.resetWrapper.bind(this)();
                this.drawNote.bind(this)(note);
                break;
        }
    };
	
	/**
	 *Start here. Get Content id then rewrite the area.
	 *
	 *@this {TodoContentManager}
	 */
    TodoContentManager.prototype.start = function() {
        this._wrapper = document.querySelector('#note-content-wrapper');
        window.addEventListener('note-open', this);
    };

    exports.TodoContentManager = TodoContentManager;
})(window);