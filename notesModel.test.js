const { isTypedArray } = require('util/types')
const NotesModel = require('./notesModel')

describe('NotesModel class', () => {
  it('returns an empty array when no Notes in list', () => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]);
  })
  it('adds Note to list with addNote method', () => {
    const model = new NotesModel();
    model.addNote('Buy Milk')
    expect(model.getNotes()).toEqual(['Buy Milk']);
  })
  it('adds multiple Notes to list', () => {
    const model = new NotesModel();
    model.addNote('Buy Milk')
    model.addNote('Go to the gym')
    expect(model.getNotes()).toEqual(['Buy Milk', 'Go to the gym']);
  })
  it('resets the list when reset method is called', () => {
    const model = new NotesModel();
    model.addNote('Buy Milk')
    model.addNote('Go to the gym')
    model.reset();
    expect(model.getNotes()).toEqual([])
  })
})