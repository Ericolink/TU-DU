// --------------------- Elementos ---------------------
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const board = document.getElementById("board");
const notesContainer = document.getElementById("notesContainer");
const saveBtn = document.getElementById("saveNote");

const prevBoardBtn = document.getElementById("prevBoard");
const nextBoardBtn = document.getElementById("nextBoard");

// --------------------- Variables de paginación ---------------------
let currentPage = 0;
const notesPerPage = 6;

// --------------------- Popup ---------------------
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// --------------------- Guardar nota ---------------------
saveBtn.addEventListener("click", () => {
  const title = document.getElementById("noteTitle").value.trim();
  const desc = document.getElementById("noteDesc").value.trim();
  if (!title && !desc) return;

  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  
  // Agregar al inicio del array para que la nota nueva se vea primero
  notes.unshift({ title, desc });
  localStorage.setItem("notes", JSON.stringify(notes));

  // Limpiar inputs
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteDesc").value = "";

  currentPage = 0; // mostrar la primera página donde está la nota nueva
  loadNotes();
});

// --------------------- Cargar notas ---------------------
function loadNotes() {
  notesContainer.innerHTML = "";

  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const start = currentPage * notesPerPage;
  const end = start + notesPerPage;
  const pageNotes = notes.slice(start, end);

  pageNotes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <img class="pin" src="assets/pin.PNG" alt="tachuela" onclick="deleteNote(${start + index})">
      <h4>${note.title}</h4>
      <p>${note.desc}</p>
    `;
    notesContainer.appendChild(div);
  });

  // Mostrar u ocultar flechas
  prevBoardBtn.style.display = currentPage === 0 ? "none" : "inline-block";
  nextBoardBtn.style.display = end >= notes.length ? "none" : "inline-block";
}

// --------------------- Eliminar nota ---------------------
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));

  // Ajustar la página si eliminamos la última nota de la última página
  const totalPages = Math.ceil(notes.length / notesPerPage);
  if (currentPage >= totalPages) currentPage = totalPages - 1;
  if (currentPage < 0) currentPage = 0;

  loadNotes();
}

// --------------------- Flechas ---------------------
prevBoardBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    loadNotes();
  }
});

nextBoardBtn.addEventListener("click", () => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  if ((currentPage + 1) * notesPerPage < notes.length) {
    currentPage++;
    loadNotes();
  }
});

// --------------------- Inicializar ---------------------
window.addEventListener("load", () => {
  loadNotes();
});
