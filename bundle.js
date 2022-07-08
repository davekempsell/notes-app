(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesApi.js
  var require_notesApi = __commonJS({
    "notesApi.js"(exports, module) {
      var NotesApi2 = class {
        loadNotes(callback, callback2) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => {
            callback(data);
          }).catch(() => {
            callback2();
          });
        }
        createNote(note) {
          const data = { content: note };
          fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
        }
        resetNotes() {
          fetch("http://localhost:3000/notes", {
            method: "DELETE"
          });
        }
      };
      module.exports = NotesApi2;
    }
  });

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
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
          if (notes != null) {
            notes.forEach((note) => {
              this.array.push(note);
            });
          }
        }
      };
      module.exports = NotesModel2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(model2, api2) {
          this.api = api2;
          this.model = model2;
          this.mainContainerEl = document.querySelector("#main-container");
          this.addButton = document.querySelector("#add-note-button");
          this.addButton.addEventListener("click", () => {
            const input = document.querySelector("#new-note-input");
            this.model.addNote(input.value);
            this.api.createNote(input.value);
            this.displayNotes();
            input.value = "";
          });
          this.resetButton = document.querySelector("#reset-button");
          this.resetButton.addEventListener("click", () => {
            this.model.reset();
            this.api.resetNotes();
            this.displayNotes();
          });
        }
        displayNotes() {
          document.querySelectorAll(".note").forEach((element) => {
            element.remove();
          });
          const notes = this.model.getNotes();
          this._addToPage(notes);
        }
        displayNotesFromApi() {
          this.api.loadNotes((notes) => {
            this.model.setNotes(notes);
            this.displayNotes();
          }, () => {
            this.displayError();
          });
        }
        _addToPage(notes) {
          notes.forEach((note) => {
            const noteEl = document.createElement("div");
            noteEl.innerText = note;
            noteEl.className = "note";
            this.mainContainerEl.append(noteEl);
          });
        }
        displayError() {
          const errorMessage = document.createElement("div");
          errorMessage.innerText = "Oops, looks like something went wrong!";
          errorMessage.className = "error";
          this.mainContainerEl.append(errorMessage);
        }
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  var NotesApi = require_notesApi();
  var NotesModel = require_notesModel();
  var NotesView = require_notesView();
  var model = new NotesModel();
  var api = new NotesApi();
  var view = new NotesView(model, api);
  view.displayNotesFromApi();
})();
