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

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // 初期表示でもチェック

    document.querySelector(".returnBtn").addEventListener("click", () => {
        window.location.href = "https://mysite.f5.si/programming";
    });

    document.querySelector(".nextBtn").addEventListener("click", () => {
        window.location.href = "https://mysite.f5.si/programming/html/lesson1-3";
    });

    const runButton = document.getElementById("runButton");
    const htmlEditor = document.getElementById("htmlEditor");
    const outputFrame = document.getElementById("outputFrame");
    const errorContainer = document.getElementById("errorContainer");

    if (!runButton || !htmlEditor || !outputFrame) {
        console.error("必須のHTML要素が見つかりません。");
        return;
    }

    runButton.addEventListener("click", () => {
        errorContainer.textContent = "";
        const htmlCode = htmlEditor.value;

        try {
            const outputDoc =
                outputFrame.contentDocument || outputFrame.contentWindow.document;

            if (!outputDoc) {
                throw new Error("iframe内のドキュメントが取得できません。");
            }

            outputDoc.open();
            outputDoc.write(`
                <!DOCTYPE html>
                <html lang="ja">
                <head>
                <meta charset="UTF-8">
                </head>
                <body>
                  ${htmlCode}
                </body>
                </html>
            `);
            outputDoc.close();
        } catch (e) {
            errorContainer.textContent = `エラー: ${e.message}`;
            console.error(e);
        }
    });
});
