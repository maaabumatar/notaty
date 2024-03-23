function openAddModal() {
  let modal = document.getElementById("addNoteModal");
  modal.style.display = "block";
  clearAddModal();
}

function closeAddModal() {
  let modal = document.getElementById("addNoteModal");
  modal.style.display = "none";
}

function clearAddModal() {
  document.getElementById("addError").innerHTML = "";
  document.getElementById("addTitle").value = "";
  document.getElementById("addContent").value = "";
}

function saveNewNote() {
  const noteTitle = document.getElementById("addTitle");
  const noteContent = document.getElementById("addContent");
  let noteData = { title: noteTitle.value, content: noteContent.value };
  addNote(noteData)
    .then((response) => {
      if (response.ok) {
        closeAddModal();
        response.json().then((data) => {
          let _id = data["_id"];
          updateNotesTable(_id);
        });
      } else {
        response.text().then((error) => {
          document.getElementById("addError").innerHTML = error;
        });
      }
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("addError").innerHTML = error;
    });
}

function openEditNoteModal(noteId) {
  let modal = document.getElementById("editNoteModal");
  modal.style.display = "block";
  clearEditNoteModal();
  loadNoteData(noteId);
}

function clearEditNoteModal() {
  document.getElementById("editError").innerHTML = "";
  document.getElementById("editTitle").value = "";
  document.getElementById("editContent").value = "";
}

function closeEditNoteModal() {
  let modal = document.getElementById("editNoteModal");
  modal.style.display = "none";
}

function loadNoteData(noteId) {
  getNoteById(noteId).then((data) => {
    document.getElementById("editTitle").value = data["title"];
    document.getElementById("editContent").value = data["content"];
  });

  //need to keep noteid in an attribute in the model for later use
  let modal = document.getElementById("editNoteModal");
  let noteIdAttribute = document.createAttribute("noteid");
  noteIdAttribute.value = noteId;
  modal.setAttributeNode(noteIdAttribute);
}

function saveEditNote() {
  let modal = document.getElementById("editNoteModal");
  const _idStr = modal.getAttribute("noteid");
  const titleStr = document.getElementById("editTitle").value;
  const contentStr = document.getElementById("editContent").value;
  const noteData = { _id: _idStr, title: titleStr, content: contentStr };
  updateNote(noteData)
    .then((response) => {
      if (response.ok) {
        closeEditNoteModal();
        updateNotesTable(_idStr);
      } else {
        response.text().then((error) => {
          document.getElementById("editError").innerHTML = error;
        });
      }
    })
    .catch((error) => {
      document.getElementById("editError").innerHTML = error;
    });
}
