/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
 
 describe('notesView class', () => {
   beforeEach(() => {
     document.body.innerHTML = fs.readFileSync('./index.html');
   });

   it('adds new note from user text input', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const noteEl = document.querySelector('#new-note-input');
    noteEl.value = 'An example note'
    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1)
    expect(document.querySelectorAll('div.note')[0].innerText).toEqual('An example note')
   })
 });