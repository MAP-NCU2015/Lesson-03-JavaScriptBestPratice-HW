'use strict';

(function() {

  var _listNoteContent = [];
  var _wrapper = document.querySelector('#note-list-wrapper');

  function start() {
    fetchList((function(data) {
      updateList(data);
      drawList();
      preloadFirstNote();
    }).bind(this));
    window.addEventListener('click', (function(event) {
      onNoteOpen(event);
    }).bind(this));
  }

  function onNoteOpen(event) {
    if (event.target.classList.contains('note-title')) {
      var id = event.target.dataset.noteId;
      var content = _listNoteContent[id];
      window.dispatchEvent(new CustomEvent('note-open',
        { detail: content }));
    };
  }

  function preloadFirstNote() {
    if (_listNoteContent.length !== 0) {
      var content = _listNoteContent[0];
      window.dispatchEvent(new CustomEvent('note-open',
        { detail: content }));
    }
  }

  function updateList(list) {
    _listNoteContent = list;
  }

  function drawList() {
    var list = _listNoteContent;
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
    _wrapper.appendChild(ul);
  }

  function fetchList(afterFetch) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = (function(e) {
      // Watch out: we have a mysterious unknown 'this'.
      if (xhr.readyState === 4 && xhr.status === 200) {
        var listData = xhr.response;
        // The flow ends here.
        afterFetch(listData);
      } else if (xhr.status !== 200 ){
        // Ignore error in this case.
      }
    }).bind(this));
    xhr.send();
  }

  document.addEventListener('DOMContentLoaded', (function(event) {
    start();
  }).bind(this));

})();
