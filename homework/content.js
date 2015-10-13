'use strict';

(function (exports) {

  /**
  * Create a instance of contentManager.
  *
  * @constructor
  * @this {ContentManager}
  */
  var ContentManager = function () {
    /**
    * It contains the content of the note.
    *
    * @private 
    */
    this._wrapper = null;
  }

  ContentManager.prototype = {

   /**
    * Reset the wrapper to empty.
    * 
    * @this {ContentManager}
    */
    resetWrapper(){
      this._wrapper.innerHTML = '';
    },

    /**
    * The public interface of the contentManager.
    * Fire events and do the what event describes. 
    *
    * @this {ContentManager}
    * @param {object} event The fired event.
    */
    handleEvent(event){
      switch (event.type) {
        case 'note-open':
          var note = event.detail;
          this.resetWrapper.bind(this)();
          this.drawNote.bind(this)(note);
          break;
      }
    },

    /**
    * Initialize the contentManager.
    * 
    * @this {ContentManager}
    */
    start() {
      this._wrapper = document.querySelector('#note-content-wrapper');
      window.addEventListener('note-open', this);
    },

    /**
    * Display the content of the note.
    *
    * @this {ContentManager}
    * @param {object} note The information about the note.
    */
    drawNote(note) {
      var title = note.title;
      var h = document.createElement('h2');
      h.textContent = title;
      var passages = note.passages;
      var buff = document.createDocumentFragment();
      passages.forEach(function (passage) {
        var p = document.createElement('p');
        p.classList.add('note-passage');
        p.textContent = passage;
        buff.appendChild(p);
      });
      this._wrapper.appendChild(h);
      this._wrapper.appendChild(buff);
    }

  }

  exports.ContentManager = ContentManager;

})(window);
