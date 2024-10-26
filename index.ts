import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key'; // 環境変数を使用するのが望ましい

app.use(bodyParser.json());

// 簡単なユーザーストレージ（実際のDBに置き換えるべき）
interface User {
  username: string;
  password: string;
}

const users: User[] = [];

// 新規ユーザーを登録するエンドポイント
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // 同じユーザー名が既に存在するか確認
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'そのユーザー名は既に使用されています' });
  }

  // パスワードをハッシュ化して保存
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: '登録が完了しました' });
});

// ログインエンドポイント
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // ユーザーを検索
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'ユーザー名またはパスワードが正しくありません' });
  }

  // パスワードを確認
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'ユーザー名またはパスワードが正しくありません' });
  }

  // JWTトークンを生成
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'ログイン成功', token });
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました`);
});
