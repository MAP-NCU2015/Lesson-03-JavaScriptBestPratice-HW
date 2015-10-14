'use strict';

(function(exports) {

  /**
   * Creates an instance of ContentManager.
   *
   * @constructor
   * @this {ContentManager}
   */
  var ContentManager = function() {
    this._wrapper = document.querySelector('#note-content-wrapper');
  }

  ContentManager.prototype = {

    /**
     * Binding the 'note-open' event to the '#note-content-wrapper' node.
     * This method should be called only once to initialize the ContentManager.
     *
     * @this {ContentManager}
     */
    start() {
      window.addEventListener('note-open', (function(event) {
        var note = event.detail;
        this.resetWrapper();
        this.drawNote(note);
      }).bind(this));
    },

    /**
     * Clean the '#note-content-wrapper' DOM element.
     *
     * @this {ContentManager}
     */
    resetWrapper() {
      this._wrapper.innerHTML = '';
    },

    /**
     * Fill the '#note-content-wrapper' DOM element with the given note.
     *
     * @param {object} note - A note contains a title field of string and a passages field of string array.
     * @this {ContentManager}
     */
    drawNote(note) {
      var title = note.title;
      var h = document.createElement('h2');
      h.textContent = title;
      var passages = note.passages;
      var buff = document.createDocumentFragment();
      for(var passage of passages) {
        var p = document.createElement('p');
        p.classList.add('note-passage');
        p.textContent = passage;
        buff.appendChild(p);
      }
      this._wrapper.appendChild(h);
      this._wrapper.appendChild(buff);
    }
  };

  exports.ContentManager = ContentManager;
})(window);
