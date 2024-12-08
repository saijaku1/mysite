document.addEventListener("DOMContentLoaded", () => {
    function checkVisibility() {
        const elements = document.querySelectorAll('.talk');
        elements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                element.classList.add('visible');
            }
        });
    }

   const runButton = document.getElementById("runButton");
const htmlEditor = document.getElementById("htmlEditor");
const outputFrame = document.getElementById("outputFrame");
const errorContainer = document.getElementById("errorContainer");

runButton.addEventListener("click", () => {
    errorContainer.textContent = "";
    const htmlCode = htmlEditor.value;
    try {
        const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
        outputDoc.open();
        outputDoc.write(`
            <!DOCTYPE html>
            <html lang="ja">
            <head><meta charset="UTF-8"></head>
            <body>${htmlCode}</body>
            </html>
        `);
        outputDoc.close();
    } catch (e) {
        errorContainer.textContent = `エラー: ${e.message}`;
        console.error(e);
    }
});
