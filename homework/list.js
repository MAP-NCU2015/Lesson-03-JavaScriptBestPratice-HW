'use strict';

(function(exports) {
  var ListManager = function(){
      this._wrapper = document.querySelector('#note-list-wrapper');
      this._listNoteContent = [];
  }

  ListManager.prototype.start = function(){
      this.fetchList().then((function(data) {
        this.updateList(data);
        this.drawList();
        this.preloadFirstNote();
      }).bind(this)).catch((function () {
        // Deal with fetch error
      }).bind(this));
      window.addEventListener('click', (function(event) {
        this.onNoteOpen(event);
      }).bind(this));
  };

  ListManager.prototype.onNoteOpen = function(){
      if (event.target.classList.contains('note-title')) {
        var id = event.target.dataset.noteId;
        var content = this._listNoteContent[id];
        window.dispatchEvent(new CustomEvent('note-open',
          { detail: content }));
      };
  },

  ListManager.prototype.preloadFirstNote = function() {
    if (this._listNoteContent.length !== 0) {
      var content = this._listNoteContent[0];
      window.dispatchEvent(new CustomEvent('note-open',
        { detail: content }));
    }
  },

  ListManager.prototype.updateList = function(list) {
    this._listNoteContent = list;
  },

  ListManager.prototype.drawList = function() {
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

  ListManager.prototype.fetchList = function() {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
      xhr.responseType = 'json';
      xhr.onreadystatechange = (function(e) {
        // Watch out: we have a mysterious unknown 'this'.
        if (xhr.readyState === 4 && xhr.status === 200) {
          var listData = xhr.response;
          // The flow ends here.
          resolve(listData);
        } else if (xhr.status !== 200 ){
          // Ignore error in this case.
          reject(xhr);
        }
      }).bind(this);
      xhr.send();
    });
  }

  ListManager.prototype.getFahrenheit = function (celsius) {
    return celsius * 1.8000 + 32.0000;
  }

  exports.ListManager = ListManager;
})(window);
