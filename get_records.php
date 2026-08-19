<?php
require "config.php";
header("Content-Type: application/json");

$result = $conn->query("SELECT id, name, age, status FROM users ORDER BY id ASC");

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);

$conn->close();
?>
