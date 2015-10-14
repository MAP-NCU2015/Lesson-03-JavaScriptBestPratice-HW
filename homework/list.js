'use strict';

(function(exports) {

  var ListManager = function () {
    this._listNoteContent = [];
    this._wrapper = document.querySelector('#note-list-wrapper');
  }

  ListManager.prototype = {
    start() {
      this.fetchList()
      .then((function(data) {
        this.updateList(data);
        this.drawList();
        this.preloadFirstNote();
      }).bind(this) )
      .catch((function(){
        //exception handle code here
      }).bind(this) );

      window.addEventListener('click', (function(event) {
        this.onNoteOpen(event);
      }).bind(this));
    },

    onNoteOpen(event) {
      if (event.target.classList.contains('note-title')) {
        var id = event.target.dataset.noteId;
        var content = this._listNoteContent[id];
        window.dispatchEvent(new CustomEvent('note-open',
          { detail: content }));
      };
    },

    preloadFirstNote() {
      if (this._listNoteContent.length !== 0) {
        var content = this._listNoteContent[0];
        window.dispatchEvent(new CustomEvent('note-open',
          { detail: content }));
      }
    },

    updateList(list) {
      this._listNoteContent = list;
    },

    drawList() {
      var list = this._listNoteContent;
      var ul = document.createElement('ul');
      ul.id = 'note-title-list';
      var buff = document.createDocumentFragment();
      for( var i in list ) {
        var li = document.createElement('li');
        li.dataset.noteId = i;
        li.classList.add('note-title');
        li.textContent = list[i].title;
        // Note: buff is captured, so we now have a
        // little closure naturally.
        buff.appendChild(li);
      }
      ul.appendChild(buff);
      this._wrapper.appendChild(ul);
    },

    fetchList() {
      return new Promise(function( resolve, reject ) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
        xhr.responseType = 'json';
        xhr.onreadystatechange =  function(e) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.response);
          } else if (xhr.status !== 200 ){
            reject(xhr);
          }
        };
        xhr.send();
      });
    }
  }

  exports.ListManager = ListManager

})(window);
