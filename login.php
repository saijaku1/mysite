<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // 仮の例：実際の環境ではデータベースと照合する必要があります
    if ($username === 'user' && $password === 'pass') {
        $_SESSION['loggedin'] = true;
        echo "ログイン成功";
    } else {
        echo "ログイン失敗";
    }
}
?>
