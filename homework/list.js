'use strict';

(function(exports) {

  /**
  * Create a instance of the ListManager.
  *
  * @constructor
  * @this {ListManager}
  */
  var ListManager = function () {
    /** @private */ this._listNoteContent = [];
    /** @private */ this._wrapper = null;
  }

  ListManager.prototype = {

    /**
    * The public interface of the listManager.
    * Fire events and do the what event describes. 
    *
    * @this {ListManager}
    * @param {object} event The fired event.
    */
    handleEvent(event){
      switch(event.type){
        case 'click':
          this.onNoteOpen.bind(this)(event);
          break;
      }
    },

    /**
    * Initialize the listManager.
    *
    * @this {ListManager}
    */
    start() {
      this._wrapper = document.querySelector('#note-list-wrapper');
      this.fetchList()
          .then(this.updateList.bind(this))
          .then(this.drawList.bind(this))
          .then(this.preloadFirstNote.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      window.addEventListener('click', this);
    },

    /**
    * Fetch the note list from server.
    * In this demo case, we fetch data from localhost.
    *
    * @return {Promise} A start point of the work flow.
    */
    fetchList() {
      return new Promise((function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:8080/demo-list-notes.json', true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function (e) {
          // Watch out: we have a mysterious unknown 'this'.
          if (this.readyState === 4 && this.status === 200) {
            var listData = this.response;
            // The flow ends here.
            resolve(listData);
          } else if (this.status !== 200) {
            // Ignore error in this case.
            reject("Fetch Error");
          }
        };
        xhr.send();
      }).bind(this));
    },

    /**
    * When a note open, it will fire an 'note-open' event.
    *
    * @this {ListManager}
    * @param {object} event The information such as event source, which is about event.
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
    * When the first glance(user has'n done any action), 
    * fire a 'note-open' event to load the first note.
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
    * Update or set the note list.
    *
    * @this {ListManager}
    */
    updateList(list) {
      this._listNoteContent = list;
    },

    /**
    * Draw the title of the note list.
    *
    * @this {ListManager}
    */
    drawList() {
      var list = this._listNoteContent;
      var ul = document.createElement('ul');
      ul.id = 'note-title-list';
      var buff = document.createDocumentFragment();
      list.forEach(function (note, i) {
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
    }

  }

  exports.ListManager = ListManager;

})(window);
