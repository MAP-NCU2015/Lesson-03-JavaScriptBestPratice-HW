'use strict';

(function(exports) {
  
  var ToDoListManager = function(){
    this._listNoteContent = [];
    this._wrapper = document.querySelector('#note-list-wrapper');
  };
  
  ToDoListManager.prototype = {
    start(){
      this.fetchList()
      .then((function(data) {
        this.updateList(data);
        this.drawList();
        this.preloadFirstNote();
      }).bind(this));
      window.addEventListener('click', (function(event) {
        this.onNoteOpen(event);
      }).bind(this));
    },
    
    onNoteOpen(event){
      if (event.target.classList.contains('note-title')) {
      var id = event.target.dataset.noteId;
      var content = this._listNoteContent[id];
      window.dispatchEvent(new CustomEvent('note-open',
        { detail: content }));
      };
    },
    
    preloadFirstNote(){
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

    fetchList(afterFetch) {
      return new Promise((function(resolve , reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = (function(e) {
          // Watch out: we have a mysterious unknown 'this'.
          if (this.readyState === 4 && this.status === 200) {
            var listData = this.response;
            // The flow ends here.
            resolve(listData);
          } else if (this.status !== 200 ){
            // Ignore error in this case.
            reject('Error!');
          }
        };
        xhr.send();
      }).bind(this));
    }
    
  };

  exports.ToDoListManager = ToDoListManager;
})(window);
