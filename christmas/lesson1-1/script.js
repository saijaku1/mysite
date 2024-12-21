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
    window.location.href = "https://mysite.f5.si/programming/chirstmas/lesson1-2";
})

document.addEventListener("DOMContentLoaded", () => {
  const editors = document.querySelectorAll(".editor-container");

  editors.forEach((editorContainer) => {
    const htmlEditor = editorContainer.querySelector(".html-editor");
    const cssEditor = editorContainer.querySelector(".css-editor");
    const jsEditor = editorContainer.querySelector(".js-editor");  
    const runButton = editorContainer.querySelector(".run-button");
    const outputFrame = editorContainer.querySelector(".output-frame");

    // クエリが正しく動作しているか確認するため、ログを追加
    console.log(htmlEditor, cssEditor, jsEditor, runButton, outputFrame);

    if (!htmlEditor || !cssEditor || !runButton || !outputFrame) {
      console.error("エディタの要素が正しく設定されていません。");
      return;
    }

    // 実行ボタンのクリックイベント
    runButton.addEventListener("click", () => {
      const htmlCode = htmlEditor.value;   // value取得
      const cssCode = cssEditor.value;     // value取得
      const jscode = jsEditor ? jsEditor.value : '';  // jsEditorがない場合の対応

      console.log(htmlCode, cssCode, jscode); // デバッグ用に出力

      try {
        const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
        if (!outputDoc) {
          console.error("iframe内のドキュメントにアクセスできません。");
          return;
        }

        // iframeの内容をリセットして反映
        outputDoc.open();
        console.log("実行成功")
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
          <script>${jscode}</script>
          </html>
        `);
        outputDoc.close();
      } catch (error) {
        console.error(`エラー: ${error.message}`);
        console.error("実行失敗");
      }
    });
  });
});
