const NotesApi = require('./notesApi');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()

describe('NotesAPI class', () => {
  it('loads list of notes with loadNotes function', () => {
    // 1. Instantiate the class
    const api = new NotesApi();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    // fetch.mockResponseOnce(JSON.stringify({
    //   name: "Some value",
    //   id: 123
    // }));
    fetch.mockResponseOnce(JSON.stringify(
      ['An example note']
    ));

    // 3. We call the method, and use `expect`
    // to assert the values we get back contain
    // what we expect.
    api.loadNotes((data) => {
      expect(data).toEqual(['An example note'])
      // expect(data.name).toBe("Some value");
      // expect(data.id).toBe(123);
    });
  });
  it('should post a request to the notes backend to create a new note' , () => {
    const api = new NotesApi();
    const data = {content: 'Test data'}
    
    fetch.mockResponseOnce({
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    api.createNote(data)

    fetch.mockResponseOnce(JSON.stringify(
      ['Test data']
    ))

    api.loadNotes((response) => {
      expect(response).toEqual(['Test data'])
    });
  });
});
