class NotesModel {
  constructor() {
    this.list = [];
  }
  getNotes() {
    return this.list;
  }

  addNote(note) {
    this.list.push(note);
  }

  reset() {
    this.list = [];
  }
}

module.exports = NotesModel