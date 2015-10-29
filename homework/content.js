'use strict';

(function(exports) {                                 //exports是自己命名的 其實就是window
  var ListContentManager = function(){
    this._wrapper = null
  });
 
  ListNoteContentManager.prototype = {
      start() {
              this._wrapper = document.querySelector('#note-content-wrapper');
              window.addEventListener('note-open', (function(event) {
                var note = event.detail;
                this.resetWrapper();
                this.drawNote(note);
 }).bind(this));
 },

 resetWrapper() {
    this._wrapper.innerHTML = '';
  },

   drawNote(note) {
      var title = note.title;
      var h = document.createElement('h2');
      h.textContent = title;
      var passages = note.passages;
     var buff = document.createDocumentFragment();
      passages.forEach(function(passage) {
        var p = document.createElement('p');
        p.classList.add('note-passage');
        p.textContent = passage;
        buff.appendChild(p);
     });
      this._wrapper.appendChild(h);
     this._wrapper.appendChild(buff);
    }

    exports.ListContentManager = ListContentManager;
})(window);//這裡的window就是exports要引入的東西
