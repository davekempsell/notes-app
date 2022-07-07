class NotesView {
  constructor(model, api) {
    this.api = api
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container')
    this.button = document.querySelector('#add-note-button');
    this.button.addEventListener('click', () => {
      const input = document.querySelector('#new-note-input');
      this.model.addNote(input.value)
      this.api.createNote(input.value)
      this.displayNotes()
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
    const loadNotes = this.api.loadNotes((notes) => {
      this.model.setNotes(notes);
      this.displayNotes();
    });
    if (loadNotes === 'Error!') {
      this.displayError();
    }
  }

  _addToPage(notes) {
    notes.forEach (note => {
      const noteEl = document.createElement('div');
      noteEl.innerText = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }

  displayError() {
    const errorMessage = document.createElement('div');
    errorMessage.innerText = "Error!"
    errorMessage.className = 'error'
    this.mainContainerEl.append(errorMessage)
  }
}

module.exports = NotesView;