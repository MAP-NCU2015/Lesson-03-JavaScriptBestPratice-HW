'use strict';

(function(exports) {                                 //exports是自己命名的 其實就是window
  var ListContentManager = function(){
    this._wrapper = null
  });
 
  function start() {
    window.addEventListener('note-open', function(event) {
      var note = event.detail;
      resetWrapper();
      drawNote(note);
    });
  }

  function resetWrapper() {
    _wrapper.innerHTML = '';
  }

  function drawNote(note) {
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
    _wrapper.appendChild(h);
    _wrapper.appendChild(buff);
  }

    exports.ListContentManager = ListContentManager;
})(window);//這裡的window就是exports要引入的東西
