const dropZone = document.querySelector(".main__drop-zone");

const PRIMARY_COLOR = "var(--primary-color)";
const SECONDARY_COLOR = "var(--secondary-color)";


dropZone.addEventListener("dragover", e => {
  e.preventDefault();
});
dropZone.addEventListener("dragenter", e => {
  dropZone.style.backgroundColor = SECONDARY_COLOR;
  dropZone.innerText = "DROP HERE";
});
dropZone.addEventListener("dragleave", e => {
  dropZone.style.backgroundColor = PRIMARY_COLOR;
  dropZone.innerText = "DRAG FILE";
});
dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.style.backgroundColor = PRIMARY_COLOR;
  dropZone.innerText = "FILE DROPPED";
});