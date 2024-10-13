const urlContainer = document.getElementById("url");
const urlInput = document.getElementById("url-input");
let urlToTransform = "";
let loadingQrCode = false;

urlInput.addEventListener("input", (e) => {
  urlToTransform = e.target.value;
});

window.addEventListener("submit", (e) => {
  e.preventDefault();
});
