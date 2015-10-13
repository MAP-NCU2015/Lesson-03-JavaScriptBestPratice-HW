'use strict';

(function(exports) {
    var TodoContentManager = {
        _wrapper: null,

        resetWrapper() {
                TodoContentManager._wrapper.innerHTML = '';
            },

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
                TodoContentManager._wrapper.appendChild(h);
                TodoContentManager._wrapper.appendChild(buff);
            },

            init() {
                TodoContentManager._wrapper = document.querySelector('#note-content-wrapper');
                window.addEventListener('note-open', function(event) {
                    var note = event.detail;
                    TodoContentManager.resetWrapper();
                    TodoContentManager.drawNote(note);
                });
            }
    };
    exports.TodoContentManager = TodoContentManager;
})(window);