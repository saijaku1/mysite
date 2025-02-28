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
    window.location.href = "https://mysite.f5.si/programming/html/lesson1-4";
})

document.addEventListener("DOMContentLoaded", () => {
  const editors = document.querySelectorAll(".editor");

  editors.forEach((editor) => {
    // セレクタの修正
    const runButton = editor.querySelector(".run-button");  // ボタン
    const htmlEditor = editor.querySelector(".html-editor");  // テキストエリア
    const outputFrame = editor.querySelector(".output-frame");  // iframe
    const errorContainer = editor.querySelector(".error-container");  // エラーメッセージ表示用

    if (!runButton || !htmlEditor || !outputFrame || !errorContainer) {
      console.error("エディタ内の要素が見つかりません。");
      return;
    }

    // ボタンがクリックされたときの動作
    runButton.addEventListener("click", () => {
      errorContainer.textContent = "";  // エラーメッセージをリセット
      const htmlCode = htmlEditor.value;  // HTMLコードを取得

      try {
        const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;

        if (!outputDoc) {
          throw new Error("iframe内のドキュメントにアクセスできません。");
        }

        outputDoc.open();
        outputDoc.write(`<!DOCTYPE html>
        <html lang="ja">
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          ${htmlCode}
        </body>
        </html>`);
        console.log("成功です！"+htmlCode +"と出力されました！")
        outputDoc.close();
      } catch (e) {
        errorContainer.textContent = `エラー: ${e.message}`;
        console.log("成功です！"+htmlCode +"と出力されました！")
        console.error(e);
      }
    });
  });
});
