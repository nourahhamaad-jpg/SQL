<?php
require "config.php";
header("Content-Type: application/json");

$name = trim($_POST["name"] ?? "");
$age  = intval($_POST["age"] ?? 0);

if ($name !== "" && $age > 0) {
    $stmt = $conn->prepare("INSERT INTO users (name, age, status) VALUES (?, ?, 0)");
    $stmt->bind_param("si", $name, $age);
    $stmt->execute();
    $newId = $stmt->insert_id;
    $stmt->close();

    echo json_encode([
        "success" => true,
        "id" => $newId,
        "name" => $name,
        "age" => $age,
        "status" => 0
    ]);
} else {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}

$conn->close();
?>
