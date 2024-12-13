const runButton = document.getElementById('runButton');
const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const jsEditor = document.getElementById('jsEditor');
const outputFrame = document.getElementById('outputFrame');
const errorContainer = document.getElementById('errorContainer');

// 保存用のキー
const STORAGE_KEYS = {
  html: 'htmlEditorContent',
  css: 'cssEditorContent',
  js: 'jsEditorContent'
};

// ローカルストレージからデータを読み込む
function loadEditorContent() {
  htmlEditor.value = localStorage.getItem(STORAGE_KEYS.html) || '';
  cssEditor.value = localStorage.getItem(STORAGE_KEYS.css) || '';
  jsEditor.value = localStorage.getItem(STORAGE_KEYS.js) || '';
}

// エディタの内容をローカルストレージに保存する
function saveEditorContent() {
  localStorage.setItem(STORAGE_KEYS.html, htmlEditor.value);
  localStorage.setItem(STORAGE_KEYS.css, cssEditor.value);
  localStorage.setItem(STORAGE_KEYS.js, jsEditor.value);
}

// 入力内容を保存するイベントリスナー
htmlEditor.addEventListener('input', saveEditorContent);
cssEditor.addEventListener('input', saveEditorContent);
jsEditor.addEventListener('input', saveEditorContent);

// コードを実行
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
      </script>
    </body>
    </html>
  `);
  outputDoc.close();
});

// エラーメッセージを表示
window.addEventListener('message', event => {
  errorContainer.textContent = `エラー: ${event.data}`;
});

// ページ読み込み時にエディタ内容を復元
document.addEventListener('DOMContentLoaded', () => {
  loadEditorContent();

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
