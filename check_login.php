<?php
session_start();
header('Content-Type: application/json');

// セッションにログイン情報があればログイン済みとみなす
$response = [
    'isLoggedIn' => isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true
];

echo json_encode($response);
?>
