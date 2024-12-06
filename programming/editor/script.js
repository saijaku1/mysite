const runButton = document.getElementById('runButton');
const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const jsEditor = document.getElementById('jsEditor');
const outputFrame = document.getElementById('outputFrame');
const errorContainer = document.getElementById('errorContainer');


runButton.addEventListener('click', () => {
  errorContainer.textContent = ''; 

  const htmlCode = htmlEditor.value;
  const cssCode = cssEditor.value;
  const jsCode = jsEditor.value;

 
  const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
  outputDoc.open();
  outputDoc.write(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <style>${cssCode}</style>
    </head>
    <body>
      ${htmlCode}
      <script>
        try {
          ${jsCode}
        } catch (error) {
          const parentWindow = window.parent || window.top;
          parentWindow.postMessage(error.toString(), '*');
        }
      <\/script>
    </body>
    </html>
  `);
  outputDoc.close();
});

window.addEventListener('message', event => {
  errorContainer.textContent = `エラー: ${event.data}`;
});
 document.addEventListener("DOMContentLoaded", () => {
            const questions = document.querySelectorAll(".question");

            questions.forEach(question => {
                question.addEventListener("click", () => {
                    const answer = question.nextElementSibling;

                    document.querySelectorAll(".answer").forEach(a => {
                        if (a !== answer) {
                            a.style.maxHeight = null;
                        }
                    });

                    if (answer.style.maxHeight) {
                        answer.style.maxHeight = null;
                    } else {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                });
            });
        });
