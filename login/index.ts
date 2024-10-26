import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
const PORT = 3000;

// CORSを有効にする
app.use(cors());
app.use(bodyParser.json());

let users: { username: string; password: string }[] = [];

// ユーザー登録エンドポイント
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // ユーザー名が既に存在するか確認
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'そのユーザー名は既に使用されています' });
        }

        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        res.status(201).json({ message: '登録が完了しました' });
    } catch (error) {
        console.error('登録エラー:', error);
        res.status(500).json({ message: '登録に失敗しました' });
    }
});

// ユーザーログインエンドポイント
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'ユーザー名またはパスワードが間違っています' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'ユーザー名またはパスワードが間違っています' });
    }

    res.status(200).json({ message: 'ログイン成功！' });
});

// サーバーの起動
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
});


// サーバーを起動
app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました`);
});
