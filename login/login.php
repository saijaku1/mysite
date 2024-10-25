<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // JSONファイルを読み込む
    $filePath = 'users.json';
    $users = [];

    if (file_exists($filePath)) {
        $users = json_decode(file_get_contents($filePath), true);
    }

    foreach ($users as $user) {
        if ($user['username'] === $username && password_verify($password, $user['password'])) {
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            echo "ログイン成功";
            exit;
        }
    }
    echo "ログイン失敗";
}
?>
