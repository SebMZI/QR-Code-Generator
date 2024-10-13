const urlContainer = document.querySelector(".url");
const qrHeader = document.querySelector(".qr-header");
const qrContainer = document.getElementById("qr-code__container");
const alertBox = document.querySelector(".alert-box");
const urlInput = document.getElementById("url-input");
const qrCodeDiv = document.getElementById("qr-code__container");
const downloadBtn = document.getElementById("download-btn");
const shareBtn = document.getElementById("share-btn");

let urlToTransform = "";
let loadingQrCode = false;
let qrCode;

urlInput.addEventListener("input", (e) => {
  urlToTransform = e.target.value;
});

window.addEventListener("submit", (e) => {
  e.preventDefault();
  if (urlToTransform.length < 1) {
    alertBox.style.opacity = 1;
    alertBox.style.transform = "translateY(0px)";
    alertBox.innerHTML = "Please enter an URL!";

    setTimeout(() => {
      alertBox.style.opacity = 0;
      alertBox.style.transform = "translateY(-100px)";
    }, 3000);
  } else {
    qrHeader.style.display = "block";
    qrCodeDiv.style.display = "grid";
    urlContainer.style.display = "none";
    qrCode = new QRCode(document.querySelector(".qr-code"), urlToTransform);
    console.log(qrCode);
  }
});

downloadBtn.addEventListener("click", () => {
  const qrCodeImage = qrCodeDiv.querySelector(".qr-code img");

  if (qrCodeImage) {
    const imgUrl = qrCodeImage.src;

    fetch(imgUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qr-code.png";
        link.click();
      })
      .catch((err) => console.error("Failed to get the img", err));
  } else {
    console.error("No qr code found");
  }
});

shareBtn.addEventListener("click", () => {
  const qrCodeImage = qrCodeDiv.querySelector(".qr-code img");

  const imgUrl = qrCodeImage.src;
  fetch(imgUrl)
    .then((response) => response.blob())
    .then((blob) => {
      navigator.clipboard
        .write([new ClipboardItem({ "image/png": blob })])
        .catch((err) => {
          console.error("Failed to copy the image to the clipboard:  ", err);
        });

      alertBox.style.opacity = 1;
      alertBox.style.transform = "translateY(0px)";
      alertBox.style.color = "green";
      alertBox.style.borderColor = "green";
      alertBox.innerHTML = "Image copied to clipboard!";

      setTimeout(() => {
        alertBox.style.opacity = 0;
        alertBox.style.transform = "translateY(-100px)";
      }, 3000);
    })
    .catch((err) => console.error("Failed to get the image", err));
});
