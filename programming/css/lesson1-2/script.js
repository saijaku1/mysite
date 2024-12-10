function checkVisibility() {
    const elements = document.querySelectorAll('.talk');
    
    elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
document.addEventListener('DOMContentLoaded', checkVisibility);

const returnBtn = document.querySelector(".home").addEventListener("click", () => {
    window.location.href = "https://mysite.f5.si/programming";
})
const nextBtn = document.querySelector(".next").addEventListener("click", () => {
    window.location.href = "https://mysite.f5.si/programming/css/lesson1-3";
})

document.addEventListener("DOMContentLoaded", () => {
  const editors = document.querySelectorAll(".editor-container");

  editors.forEach((editorContainer) => {
    const htmlEditor = editorContainer.querySelector(".html-editor");
    const cssEditor = editorContainer.querySelector(".css-editor");
    const runButton = editorContainer.querySelector(".run-button");
    const outputFrame = editorContainer.querySelector(".output-frame");

    if (!htmlEditor || !cssEditor || !runButton || !outputFrame) {
      console.error("エディタの要素が正しく設定されていません。");
      return;
    }

    // 実行ボタンのクリックイベント
    runButton.addEventListener("click", () => {
      const htmlCode = htmlEditor.value;
      const cssCode = cssEditor.value;

      try {
        const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;

        if (!outputDoc) {
          throw new Error("iframe内のドキュメントにアクセスできません。");
        }

        // iframeにHTMLとCSSを反映
        outputDoc.open();
        outputDoc.write(`
          <!DOCTYPE html>
          <html lang="ja">
          <head>
            <meta charset="UTF-8">
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
          </body>
          </html>
        `);
        outputDoc.close();
      } catch (error) {
        console.error(`エラー: ${error.message}`);
      }
    });
  });
});
