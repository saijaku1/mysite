document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // ログイン成功
            document.getElementById('message').textContent = 'ログイン成功！';
            // この下にホームページにリダイレクトしたうぞ！
            window.location.href="https://mysite.f5.si";
        } else {
            // エラーメッセージを表示
            document.getElementById('message').textContent = data.message;
        }
    } catch (error) {
        console.error('エラー:', error);
        document.getElementById('message').textContent = 'ログインに失敗しました';
    }
});
