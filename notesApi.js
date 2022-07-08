class NotesApi {
  loadNotes(callback, callback2) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        callback(data);
      })
      .catch(() => {
        callback2();
      })
      
  }

  createNote(note){
    const data = { content: note}
    fetch('http://localhost:3000/notes', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  resetNotes() {
    fetch('http://localhost:3000/notes', {
      method: 'DELETE'
    })
  }
}

module.exports = NotesApi