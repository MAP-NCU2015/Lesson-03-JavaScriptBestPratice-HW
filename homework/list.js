'use strict';

/**
 * @typedef {Object} Note
 * @property {String} title
 * @property {String} passages
 */

(function(exports) {

  /**
   * Create a instance of ListManager
   * @constructor
   * @this {ListManager}
   */
  var ListManager = function(){
      this._wrapper = document.querySelector('#note-list-wrapper');
      this._listNoteContent = [];
  }


  /**
   * Fetch the notes from remote server, draw them in the notes wrapper,
   * and bind click event to dispatch note-open event
   *
   * @this {ListManager}
   */
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


  /**
   * Dispatch the note-open event and prepare the param for the dispatched event
   *
   * @this {ListManager}
   */
  ListManager.prototype.onNoteOpen = function(){
      if (event.target.classList.contains('note-title')) {
        var id = event.target.dataset.noteId;
        var content = this._listNoteContent[id];
        window.dispatchEvent(new CustomEvent('note-open',
          { detail: content }));
      };
  },


  /**
   * Preload the first note at the first time this instance start
   *
   * @this {ListManager}
   */
  ListManager.prototype.preloadFirstNote = function() {
    if (this._listNoteContent.length !== 0) {
      var content = this._listNoteContent[0];
      window.dispatchEvent(new CustomEvent('note-open',
        { detail: content }));
    }
  },


  /**
   * Update the list in this ListManager instance
   *
   * @this {ListManager}
   */
  ListManager.prototype.updateList = function(list) {
    this._listNoteContent = list;
  },


  /**
   * Draw the note list in the notes wrapper
   *
   * @this {ListManager}
   */
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


  /**
   * Fetch the notes list from remote server using ajax
   *
   * @this     {ListManager}
   * @return   {Promise} Result
   * @resolves {Note[]} A list of note
   * @reject   {XMLHttpRequest} The XMLHttpRequest instance
   */
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


  /**
   * Calculate the degree in Fahrenheit scale for a given Celsius scale degree
   *
   * @param  {Float} A degree in Celsius scale
   * @this   {ListManager}
   * @return {Float} A degree in Fahrenheit scale
   */
  ListManager.prototype.getFahrenheit = function (celsius) {
    return celsius * 1.8000 + 32.0000;
  }


  exports.ListManager = ListManager;
})(window);
