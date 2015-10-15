'use strict';

(function(exports) {

var ListManager = function() {
  var _listNoteContent = [];
  var _wrapper = null;
};

ListManager.prototype = {

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

  fetchList(url) {
    return new Promise(function(reslove, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onreadystatechange = (function(e) {
        // Watch out: we have a mysterious unknown 'this'.
        if (this.readyState === 4 && this.status === 200) {
          var listData = this.response;
          // The flow ends here.
          reslove(listData);
        } else if (this.status !== 200 ){
          reject(new Error('FETCHING FAILED: ' + this.status + ' ' + this.readyState));
        }
      }).bind(xhr);
      xhr.send();
    });
  },

  handleEvent(event) {
    switch(event.type) {
      case 'click':
        this.onNoteOpen(event);
        break;
    }
  },

  start() {
    this._wrapper = document.querySelector('#note-list-wrapper');
    this.fetchList('./demo-list-notes.json').then((function(response) {
      this.updateList(response);
      this.drawList();
      this.preloadFirstNote();
    }).bind(this)).catch(function(error){
      console.error(error);
    });
    window.addEventListener('click', this);
  }
};

exports.ListManager = ListManager;
})(window);
