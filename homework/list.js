'use strict';

(function() {

  var _listNoteContent = [];
  var _wrapper = document.querySelector('#note-list-wrapper');

  function start() {
    var li = new list();
    this.fetchList()
	.then((function(data) {
      li.updateList(data);
      li.drawList();
      li.preloadFirstNote();
    }).bind(this));
    window.addEventListener('click', 
	  (function(event) {
        li.onNoteOpen(event);
      }).bind(this));//Bind this
  }
  
  list.prototype.add = function(num1, num2){//test
	return num1 + num2;
  }

  list.prototype.onNoteOpen = function(event) {
    if (event.target.classList.contains('note-title')) {
      var id = event.target.dataset.noteId;
      var content = _listNoteContent[id];
      window.dispatchEvent(new CustomEvent('note-open',
        { detail: content }));
    };
  }

  list.prototype.preloadFirstNote = function() {
    if (_listNoteContent.length !== 0) {
      var content = _listNoteContent[0];
      window.dispatchEvent(new CustomEvent('note-open',
        { detail: content }));
    }
  }

  list.prototype.updateList = function(list1) {
    _listNoteContent = list1;
  }

  list.prototype.drawList = function() {
    var list2 = _listNoteContent;
    var ul = document.createElement('ul');
    ul.id = 'note-title-list';
    var buff = document.createDocumentFragment();
    list2.forEach((function(note, i) {
      var li = document.createElement('li');
      li.dataset.noteId = i;
      li.classList.add('note-title');
      li.textContent = note.title;
      // Note: buff is captured, so we now have a
      // little closure naturally.
      buff.appendChild(li);
    }).bind(this));
    ul.appendChild(buff);
    _wrapper.appendChild(ul);
  }

  list.prototype.fetchList = function(afterfetch) {
    return new Promise((function(resolve, reject) {//use Promise
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://127.0.0.1:8000/demo-list-notes.json', true);
		xhr.responseType = 'json';
		xhr.onreadystatechange = function(e) {
		// Watch out: we have a mysterious unknown 'this'.
			if (this.readyState === 4 && this.status === 200) {
				var listData = this.response;
				// The flow ends here.
				resolve(listData);
			} 
			else if (this.status !== 200 ){
				reject('FETCHING FAILED: ' + this.status + ' ' + this.readyState);
				// Ignore error in this case.
			}
		};
		xhr.send();
	}).bind(this));
  }

  document.addEventListener('DOMContentLoaded', function(event) {
    start();
  });
  module.exports.add = add;

})();