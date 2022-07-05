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
    const note = document.querySelector('#new-note-input').value;
    this.model.addNote(note)
    const notes = this.model.getNotes();
    
    notes.forEach (note => {
      const noteEl = document.createElement('div');
      noteEl.innerText = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
    

  }
}

module.exports = NotesView;