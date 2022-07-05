class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container')
    this.button = document.querySelector('#add-note-button');
    this.button.addEventListener('click', () => {
      this.displayNotes();
    })
  }

  displayNotes() {
    document.querySelectorAll('.note').forEach(element => {
      element.remove();
    });
    const input = document.querySelector('#new-note-input');
    this.model.addNote(input.value)
    const notes = this.model.getNotes();

    this._addToPage(notes);
    
    input.value = '';
  }

  _addToPage(notes) {
    notes.forEach (note => {
      const noteEl = document.createElement('div');
      noteEl.innerText = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }
}

module.exports = NotesView;