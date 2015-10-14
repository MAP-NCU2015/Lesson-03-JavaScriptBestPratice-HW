'use strict';

(function(exports) {

  /**
   * Creates an instance of ListManager.
   *
   * @constructor
   * @this {ListManager}
   */
  var ListManager = function() {
    this._listNoteContent = [];
    this._wrapper = document.querySelector('#note-list-wrapper');
  }

  ListManager.prototype = {

    /**
     * Binding the 'click' event to the '#note-list-wrapper' node and
     * fetch the data from server then draw it.
     * This method should be called only once to initialize the ListManager.
     *
     * @this {ListManager}
     */
    start() {
      this.fetchList().then((function(data){
        this.updateList(data);
        this.drawList();
        this.preloadFirstNote();
      }).bind(this)).catch((function() {

      }).bind(this));
      window.addEventListener('click', (function(event) {
        this.onNoteOpen(event);
      }).bind(this));
    },

    /**
     * Dispatch a CustomEvent 'note-open' with note detail to window for others to use.
     *
     * @param {CustomEvent} event - Which event.target has 'note-title' in its classList.
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
     * Dispatch a CustomEvent 'note-open' with the first note.
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
     * Setter of _listNoteContent
     *
     * @param {array} list - List of notes. A note contains a title field of string and a passages field of string array.
     * @this {ListManager}
     */
    updateList(list) {
      this._listNoteContent = list;
    },

    /**
     * Fill the '#note-list-wrapper' DOM element with the current _listNoteContent.
     *
     * @this {ListManager}
     */
    drawList() {
      var list = this._listNoteContent;
      var ul = document.createElement('ul');
      ul.id = 'note-title-list';
      var buff = document.createDocumentFragment();
      for(var i in list) {
        var li = document.createElement('li');
        li.dataset.noteId = i;
        li.classList.add('note-title');
        li.textContent = list[i].title;
        buff.appendChild(li);
      }
      ul.appendChild(buff);
      this._wrapper.appendChild(ul);
    },

    /**
     * Fetch the node list from the server.
     *
     * @this {ListManager}
     */
    fetchList() {
      return XHRequest('GET', 'http://127.0.0.1:8000/demo-list-notes.json');
    }
  }

  exports.ListManager = ListManager;
})(window);
