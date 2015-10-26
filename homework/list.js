'use strict';
function ToDoList(){
    this._listNoteContent = [];
    this._wrapper = document.querySelector('#note-list-wrapper');
}
ToDoList.prototype = {
    start: function() {
	this.fetchList(function(data) {
	    this.updateList(data);
	    this.drawList();
	    this.preloadFirstNote();
	}.bind(this));
	window.addEventListener('click', function(event) {
	    this.onNoteOpen(event);
	}.bind(this));
    },

    onNoteOpen: function(event) {
	if (event.target.classList.contains('note-title')) {
	    var id = event.target.dataset.noteId;
	    var content = this._listNoteContent[id];
	    window.dispatchEvent(new CustomEvent('note-open',
						 { detail: content }));
	};
    },

    preloadFirstNote: function() {
	if (this._listNoteContent.length !== 0) {
	    var content = this._listNoteContent[0];
	    window.dispatchEvent(new CustomEvent('note-open',
						 { detail: content }));
	}
    },

    updateList: function(list) {
	this._listNoteContent = list;
    },

    drawList: function() {
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

    fetchList: function(afterFetch) {
	var xhr = new XMLHttpRequest();
	new Promise(function(resolve, reject){
	    xhr.open('GET', '/demo-list-notes.json', true);
	    xhr.responseType = 'json';
	    xhr.onreadystatechange = function(e) {
		// Watch out: we have a mysterious unknown 'this'.
		if (this.readyState === 4 && this.status === 200) {
		    // The flow ends here.
		    resolve();
		} else if (this.status !== 200 ){
		    // Ignore error in this case.
		    reject();
		}
	    };
	    xhr.send();
	}).then(function(){
	    afterFetch(xhr.response);
	}).catch(function(){
	    console.log("fetchList failed.")
	})
    }
};
document.addEventListener('DOMContentLoaded', function(event) {
    var toDoList = new ToDoList();
    toDoList.start();
});
