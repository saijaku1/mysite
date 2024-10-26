document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // 登録成功
            document.getElementById('message').textContent = '登録成功！';
            // リダイレクト
            window.location.href = 'https://mysite.f5.si';
        } else {
            // エラーメッセージを表示
            document.getElementById('message').textContent = data.message;
        }
    } catch (error) {
        console.error('エラー:', error);
        document.getElementById('message').textContent = '登録に失敗しました';
    }
});

