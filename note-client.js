const baseURL = "https://notaty-server-github-io.onrender.com";

async function addNote(noteData) {
  const response = await fetch(`${baseURL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  return response;
}

async function updateNote(noteData) {
  const response = await fetch(`${baseURL}/notes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  return response;
}

async function deleteNote(noteId) {
  const response = await fetch(`${baseURL}/notes/${noteId}`, {
    method: "DELETE",
  });
  return response;
}

async function getNoteById(noteId) {
  const response = await fetch(`${baseURL}/notes/${noteId}`);
  return response.json();
}

async function getNotes(noteTitle) {
  let url = `${baseURL}/notes`;
  if (noteTitle) {
    url += `/?title=${noteTitle}`;
  }
  const response = await fetch(url);
  return response.json();
}
