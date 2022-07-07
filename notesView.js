class NotesView {
  constructor(model, api) {
    this.api = api
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container')
    this.button = document.querySelector('#add-note-button');
    this.button.addEventListener('click', () => {
      const input = document.querySelector('#new-note-input');
      this.api.createNote(input.value)
      .then(response => this.displayNotesFromApi())
      input.value = '';
    })
  }
  
  displayNotes() {
    document.querySelectorAll('.note').forEach(element => {
      element.remove();
    });

    const notes = this.model.getNotes();
    this._addToPage(notes);
  }

  displayNotesFromApi() {
    this.api.loadNotes((notes) => {
      this.model.setNotes(notes);
      this.displayNotes();
    });
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