'use strict';

(function(exports) {

  /**
  * Creates an instance of ListManager.
  *
  * @constructor
  * @this {ListManager}
  */
  var ListManager = function () {
    this._listNoteContent = [];
    this._wrapper = document.querySelector('#note-list-wrapper');
  }

  ListManager.prototype = {

    /**
    * Fetch remote data to render list and
    * bind 'click' event to initialize the ListManager.
    *
    * @this {ListManager}
    */
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

    /**
    * Dispatch a 'note-open' event if event target has 'note-title' in its classList.
    *
    * @param {CustomEvent} event Its target may have 'note-title' in classList.
    * @this {ListManager}
    */
    onNoteOpen(event) {
      if (event.target.classList.contains('note-title')) {
        var id = event.target.dataset.noteId;
        var content = this._listNoteContent[id];
        window.dispatchEvent(new CustomEvent('note-open',
          { detail: content }));
      };
    },

    /**
    * Dispatch a 'note-open' event with first note if note list is not empty
    *
    * @this {ListManager}
    */
    preloadFirstNote() {
      if (this._listNoteContent.length !== 0) {
        var content = this._listNoteContent[0];
        window.dispatchEvent(new CustomEvent('note-open',
          { detail: content }));
      }
    },

    /**
    * Set the note list.
    *
    * @param {Array} list Notes.
    * @this {ListManager}
    */
    updateList(list) {
      this._listNoteContent = list;
    },

    /**
    * Render note list to '#note-list-wrapper'.
    *
    * @this {ListManager}
    */
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

    /**
    * Fetch remote data of note list.
    *
    * @this {ListManager}
    * @return {Promise} The ajax handler
    */
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
