function updateNotesTable(noteId, noteTitle) {
  var table = document.getElementById("notes-table");
  var rowCount = table.rows.length;
  while (--rowCount) {
    table.deleteRow(rowCount);
  }
  getNotes(noteTitle)
    .then((data) => {
      data.forEach((note) => {
        var row = table.insertRow(1); //beware that row(0) contains the headers
        var idAttribute = document.createAttribute("id");
        idAttribute.value = note["_id"]; // <-- giving the row an id identitical to the note it is holding for later use
        row.setAttributeNode(idAttribute);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = note["title"];
        cell2.innerHTML = note["content"];
        cell3.innerHTML = note["updatedDate"];
        cell4.innerHTML = `<a onclick="openEditNoteModal('${note["_id"]}')" href="#"><img src="images/edit.png" style="width: 22px;"></img></a>
                         <a onclick="confirmDeleteNote('${note["_id"]}')" href="#"><img src="images/delete.png" style="width: 22px;"></img></a>`;
      });
    })
    .then(() => {
      if (noteId) {
        var row = document.getElementById(noteId);
        row.setAttribute("style", "animation: new-row 5s;"); //<-- new-row is a keyframe in the CSS fir\le "style.css"
      }
    });
}

function searchNotes() {
  const searchTitle = document.getElementById("searchInput").value;
  updateNotesTable(undefined, searchTitle);
}

function confirmDeleteNote(noteId) {
  var action = confirm("Are you sure you want to delete this note?");
  if (action == true) {
    deleteNote(noteId).then(() => {
      updateNotesTable();
    });
  }
}
