const dropZone = document.getElementById("dropZone");
const results = document.querySelector(".results");
const resultsTable = document.getElementById("resultsTable");

function allowedExtension(file) {
  return file.name.endsWith(".wav");
}

function getWavHeader(buffer) {
  const view = new DataView(buffer);

  const chunkID = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
  const chunkSize = view.getUint32(4, true);
  const format = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11));
  const subChunkID = String.fromCharCode(view.getUint8(12), view.getUint8(13), view.getUint8(14), view.getUint8(15));
  const audioFormat = view.getUint16(20, true);
  const numChannels = view.getUint16(22, true);
  const sampleRate = view.getUint32(24, true);
  const byteRate = view.getUint32(28, true);
  const blockAlign = view.getUint16(32, true);
  const bitsPerSample = view.getUint16(34, true);
  
  return {
    chunkID,
    chunkSize,
    format,
    subChunkID,
    audioFormat,
    numChannels,
    sampleRate,
    byteRate,
    blockAlign,
    bitsPerSample
  };
}

function handleFileDrop(e) {
  e.preventDefault();

  const file = e.dataTransfer.files[0];

  if (!allowedExtension(file)) {
    alert("Valid File is only wav file!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const buffer = e.target.result;
    const header = getWavHeader(buffer);

    headerResults(header);
  };
  
  reader.readAsArrayBuffer(file);

  dropZone.classList.remove("active");
  dropZone.innerText = "FILE DROPPED";
  results.classList.add("active");
}

function headerResults(header) {
  const tbody = document.querySelector(".results__table tbody");

  for (const key in header) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${key}</td><td>${header[key]}</td>`;
    tbody.appendChild(tr);
  }
}

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
});
dropZone.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dropZone.classList.add("active");
  dropZone.innerText = "DROP HERE";
});
dropZone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropZone.classList.remove("active");
  dropZone.innerText = "DRAG FILE";
});
dropZone.addEventListener('drop', handleFileDrop);