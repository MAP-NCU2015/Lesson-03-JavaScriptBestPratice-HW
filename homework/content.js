'use strict';

(function (exports) {
    var TodoContentManager = function () {
        this._wrapper = null;
    }
    TodoContentManager.prototype = {
        start() {
            window.addEventListener('note-open', function (event) {
                var note = event.detail;
                this.resetWrapper();
                this.drawNote(note);
            });
            this._wrapper = document.querySelector('#note-content-wrapper');
        },
        resetWrapper() {
            this._wrapper.innerHTML = '';
        },
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
