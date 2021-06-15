// catching essential Element
const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector("header");
const button = document.querySelector("button");
const input = document.querySelector("input");
let file;

// if button is clicked input also clicked
button.addEventListener("click", () => input.click());

input.addEventListener("change", function () {
  file = this.files[0];
  showFile();
  dropArea.classList.add("active");
});

//dragOver
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//dragLeave
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//if user drop file on dropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile();
});

//
function showFile() {
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag;
    });
    fileReader.readAsDataURL(file);
  } else {
    alert(`This is not Image File!`);
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
