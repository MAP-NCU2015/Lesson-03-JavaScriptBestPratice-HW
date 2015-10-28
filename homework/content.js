'use strict';

(function(exports) {

  /**
  * Creates an instance of ContentManager.
  *
  * @constructor
  * @this {ContentManager}
  */
  var ContentManager = function () {
    this._wrapper = document.querySelector('#note-content-wrapper');
  }

  ContentManager.prototype = {

    /**
    * Bind 'note-open' event to initialize the ContentManager.
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
    * Reset the content of '#note-content-wrapper'.
    *
    * @this {ContentManager}
    */
    resetWrapper() {
      this._wrapper.innerHTML = '';
    },

    /**
    * Render content to '#note-content-wrapper' from param data
    *
    * @param {Object}   note Information about a note.
    * @param {String}   note.title The title of the note.
    * @param {String[]} note.passages passages of the note.
    * @this {ContentManager}
    */
    drawNote(note) {
      var title = note.title;
      var h = document.createElement('h2');
      h.textContent = title;
      var passages = note.passages;
      var buff = document.createDocumentFragment();
      for( var passage of passages ) {
        var p = document.createElement('p');
        p.classList.add('note-passage');
        p.textContent = passage;
        buff.appendChild(p);
      }
      this._wrapper.appendChild(h);
      this._wrapper.appendChild(buff);
    },

    /**
    * Calculate the bigger one of two numbers
    *
    * @param {Number}  a number
    * @param {Number}  b number
    * @this {ListManager}
    * @return {Number} the bigger one of a and b
    */
    calculateMaxNumber(a, b) {
      return Math.max(a, b);
    }
  }

  exports.ContentManager = ContentManager;

})(window);
