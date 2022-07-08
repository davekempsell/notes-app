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

  fetchEmoji(input, callback) {
    const data = {text: input}
    let newData = "test"
    let setValue = (data) => {
      newData = data
    }
    fetch('https://makers-emojify.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then((data) => {
      callback(data.emojified_text)
      console.log(`data: ${data.emojified_text}`)
    })
  }
}

module.exports = NotesApi