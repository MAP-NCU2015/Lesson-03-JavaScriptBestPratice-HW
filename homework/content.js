'use strict';

(function(exports) {

    //this is a constructor
    var TodoContentManager = function() {
        this._wrapper = document.querySelector('#note-content-wrapper');
    }

    //define its prototype
    TodoContentManager.prototype = {

        start() {
            window.addEventListener('note-open',this);
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
        },

        handleEvent(event) {      
            switch(event.type) {
                case 'note-open':
                    var note = event.detail;
                    this.resetWrapper();
                    this.drawNote(note);
                    break;
            }
        }

     };

     //we use main.js to call this object
     //so export it
     exports.TodoContentManager = TodoContentManager;
          
})(window);
