class NotesModel {
  constructor() {
    this.array = [];
  }
  getNotes() {
    return this.array;
  }

  addNote(note) {
    this.array.push(note);
  }

  reset() {
    this.array = [];
  }

  setNotes(notes) {
    if(notes != null) {
    notes.forEach (note => {
      this.array.push(note);
    });
  }
  }
}

module.exports = NotesModel