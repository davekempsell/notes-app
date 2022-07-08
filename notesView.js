class NotesView {
  constructor(model, api) {
    this.api = api
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container')
    this.addButton = document.querySelector('#add-note-button');
    this.addButton.addEventListener('click', () => {
      const input = document.querySelector('#new-note-input')
      this.api.fetchEmoji(input.value, (data) => {
        this.model.addNote(data)
        this.api.createNote(data)
        this.displayNotes()
      });
      // if(input.value === ':smile:') {
        // this.api.fetchEmoji(emoji, (data) => {
        //   this.model.addNote(data)
        //   this.api.createNote(data)
        //   this.displayNotes()
        // });
      // } else {
      //   this.model.addNote(input.value)
      //   this.api.createNote(input.value)
      //   this.displayNotes()
      // }
      input.value = '';
    })
    this.resetButton = document.querySelector('#reset-button');
    this.resetButton.addEventListener('click', () => {
      this.model.reset();
      this.api.resetNotes();
      this.displayNotes();
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
    }, () => {
      this.displayError()
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

  displayError() {
    const errorMessage = document.createElement('div');
    errorMessage.innerText = "Oops, looks like something went wrong!" 
    errorMessage.className = 'error'
    this.mainContainerEl.append(errorMessage)
  }
}

module.exports = NotesView;