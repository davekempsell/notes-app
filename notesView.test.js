/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesApi = require('./notesApi');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

require('jest-fetch-mock').enableMocks()
 
 describe('notesView class', () => {
   beforeEach(() => {
     document.body.innerHTML = fs.readFileSync('./index.html');
   });

   it('adds new note from user text input', () => {
    const model = new NotesModel();
    const fakeApi = {
      loadNotes: () => {
        model.setNotes(['An example note']);
        view.displayNotes();

      },
      createNote:(note) => {

      }
    }    
    
    const view = new NotesView(model, fakeApi);

    const noteEl = document.querySelector('#new-note-input');
    const buttonEl = document.querySelector('#add-note-button');
    noteEl.value = 'An example note'
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1)
    expect(document.querySelectorAll('div.note')[0].innerText).toEqual('An example note')
   })
  //  it('adds two notes when two new notes are added', () => {
  //   const model = new NotesModel();
  //   const api = new NotesApi();
  //   const view = new NotesView(model, api);

  //   const input = document.querySelector('#new-note-input');
  //   const button = document.querySelector('#add-note-button');
  //   input.value = 'An example note'
  //   button.click();
  //   input.value = "Another example note"
  //   button.click();

  //   expect(document.querySelectorAll('div.note').length).toEqual(2)
  //  })
   it('displays notes from API with displayNotesFromApi function', () => {
    const model = new NotesModel();
    const fakeApi = {
      loadNotes: () => {
        model.setNotes(['An example note', 'Another example note']);
        view.displayNotes();
      }
    }
    const view = new NotesView(model, fakeApi);
    
    // fetch.mockResponseOnce(JSON.stringify(
    //   ['Note']
    // ))
    view.displayNotesFromApi();

    expect(document.body.querySelectorAll('div.note').length).toEqual(2);
  })
 });