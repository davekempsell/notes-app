/**
 * @jest-environment jsdom
 */

const fs = require('fs');
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
      createNote: (note) => {

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
   it('displays notes from API with displayNotesFromApi function', () => {
    const model = new NotesModel();
    const fakeApi = {
      loadNotes: () => {
        model.setNotes(['An example note', 'Another example note']);
        view.displayNotes();
      }
    }
    const view = new NotesView(model, fakeApi);
    
    view.displayNotesFromApi();

    expect(document.body.querySelectorAll('div.note').length).toEqual(2);
  })
  it('displays an error message if there is a connection error', () => {
    const model = new NotesModel();
    const fakeApi = {
      loadNotes: () => {
        view.displayError()
      }
    }
    
    const view = new NotesView(model, fakeApi);

    view.displayNotesFromApi()

    expect(document.body.querySelectorAll('div.note').length).toEqual(0);
    expect(document.body.querySelectorAll('div.error').length).toEqual(1);
    expect(document.body.querySelectorAll('div.error')[0].innerText).toEqual("Oops, looks like something went wrong!");
  })
  it('it deletes all notes from the page when reset button is clicked', () => {
    const model = new NotesModel();
    const fakeApi = {
      resetNotes: () => {
        model.reset()
      },
      createNote: (note) => {

      } 
    }

    const view = new NotesView(model, fakeApi);
    const noteEl = document.querySelector('#new-note-input');
    const buttonEl = document.querySelector('#add-note-button');
    noteEl.value = 'An example note'
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1)

    const resetButton = document.querySelector('#reset-button');
    resetButton.click()

    expect(document.querySelectorAll('div.note').length).toEqual(0)
  })
  it('it deletes all notes from the page and server when reset button is clicked', () => {
    const model = new NotesModel();
    const fakeApi = {
      loadNotes: () => {
        model.setNotes();
        view.displayNotes();
      },
      resetNotes: () => {
        model.reset()
      },
      createNote: (note) => {

      } 
    }

    const view = new NotesView(model, fakeApi);
    const noteEl = document.querySelector('#new-note-input');
    const buttonEl = document.querySelector('#add-note-button');
    noteEl.value = 'An example note'
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1)

    const resetButton = document.querySelector('#reset-button');
    resetButton.click()

    expect(document.querySelectorAll('div.note').length).toEqual(0)

    view.displayNotesFromApi();
    expect(document.querySelectorAll('div.note').length).toEqual(0)
  })
 });