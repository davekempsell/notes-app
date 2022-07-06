const NotesApi = require('./notesApi');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');


const model = new NotesModel();
const api = new NotesApi();

const view = new NotesView(model, api);
view.displayNotes();




