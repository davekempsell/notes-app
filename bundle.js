(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
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
      };
      module.exports = NotesModel2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(model2) {
          this.model = model2;
          this.mainContainerEl = document.querySelector("#main-container");
          this.button = document.querySelector("#add-note-button");
          this.button.addEventListener("click", () => {
            this.displayNotes();
          });
        }
        displayNotes() {
          const note = document.querySelector("#new-note-input").value;
          this.model.addNote(note);
          const notes = this.model.getNotes();
          notes.forEach((note2) => {
            const noteEl = document.createElement("div");
            noteEl.innerText = note2;
            noteEl.className = "note";
            this.mainContainerEl.append(noteEl);
          });
        }
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  var NotesModel = require_notesModel();
  var NotesView = require_notesView();
  var model = new NotesModel();
  var view = new NotesView(model);
  view.displayNotes();
})();
