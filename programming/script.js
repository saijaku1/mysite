window.addEventListener("load", () => {
  setTimeout(() => {
    const dialog = document.querySelector("#modalDialog");
    if (dialog) dialog.showModal();
  },0);
});

const openButton = document.getElementById("openButton");
const modalDialog = document.getElementById("modalDialog");
const closeButton = document.getElementById("closeButton");

if (openButton && modalDialog) {
  openButton.addEventListener("click", () => {
    modalDialog.showModal();
    document.body.style.overflow = "hidden";
  });
}

if (closeButton && modalDialog) {
  closeButton.addEventListener("click", () => {
    modalDialog.close();
    document.body.style.overflow = "";
  });
}
