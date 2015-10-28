'use strict';

/**
 * @typedef {Object} Note
 * @property {String} title
 * @property {String} passages
 */

(function(exports) {

  /**
   * Create a instance of ContentManager
   *
   * @constructor
   * @this {ContentManager}
   */
  var ContentManager = function () {
    this._wrapper = document.querySelector('#note-content-wrapper');
  }

  /**
   * Add an event handler for note-open event which draw correct note contents
   *
   * @this {ContentManager}
   */
  ContentManager.prototype.start = function () {
    window.addEventListener('note-open', (function(event) {
      var note = event.detail;
      this.resetWrapper();
      this.drawNote(note);
    }).bind(this));
  }

  /**
   * Clear the content(HTML) in _wrapper
   *
   * @this {ContentManager}
   */
  ContentManager.prototype.resetWrapper = function () {
    this._wrapper.innerHTML = '';
  }

  /**
   * Draw the given note in the content wrapper
   *
   * @this   {ContentManager}
   * @param  {Note} Note to draw
   */
  ContentManager.prototype.drawNote = function (note) {
    var title = note.title;
    var h = document.createElement('h2');
    h.textContent = title;
    var passages = note.passages;
    var buff = document.createDocumentFragment();

    for (var i = 0; i < passages.length; i += 1) {
      var p = document.createElement('p');
      p.classList.add('note-passage');
      p.textContent = passages[i];
      buff.appendChild(p);
    }

    this._wrapper.appendChild(h);
    this._wrapper.appendChild(buff);
  }

  exports.ContentManager = ContentManager;
})(window);
