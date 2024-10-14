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
    afficherAlerte("Please enter an URL", "error");

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

downloadBtn.addEventListener("click", async () => {
  const qrCodeImage = qrCodeDiv.querySelector(".qr-code img");

  if (!qrCodeImage) {
    console.error("No qr code found");
    return;
  }

  try {
    const imgUrl = qrCodeImage.src;
    const response = await fetch(imgUrl);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qr-code.png";
    link.click();
  } catch (err) {
    console.error("Error getting the qr code", err);
  }
});

shareBtn.addEventListener("click", async () => {
  try {
    const qrCodeImage = qrCodeDiv.querySelector(".qr-code img");
    const blob = await fetch(qrCodeImage.src).then((response) =>
      response.blob()
    );

    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);

    afficherAlerte("Copied successfully!", "success");
  } catch (err) {
    console.error("Error when copying to clipboard :", err);
    afficherAlerte("Error when copying to clipboard", "error");
  }
});

function afficherAlerte(message, type) {
  alertBox.style.opacity = 1;
  alertBox.style.transform = "translateY(0px)";
  alertBox.style.color = type === "success" ? "green" : "red";
  alertBox.style.borderColor = type === "success" ? "green" : "red";
  alertBox.innerHTML = message;

  setTimeout(() => {
    alertBox.style.opacity = 0;
    alertBox.style.transform = "translateY(-100px)";
  }, 3000);
}
