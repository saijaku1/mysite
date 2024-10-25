<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // JSONファイルを読み込む
    $filePath = 'users.json';
    $users = [];

    if (file_exists($filePath)) {
        $users = json_decode(file_get_contents($filePath), true);
    }

    // 新しいユーザーを追加
    $users[] = ['username' => $username, 'password' => $password];

    // JSONファイルに書き込む
    file_put_contents($filePath, json_encode($users, JSON_PRETTY_PRINT));
    echo "登録に成功しました。";
}
?>
