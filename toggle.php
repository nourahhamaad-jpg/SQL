<?php
require "config.php";
header("Content-Type: application/json");

$id = intval($_POST["id"] ?? 0);

if ($id > 0) {
    $stmt = $conn->prepare("SELECT status FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    $row = $res->fetch_assoc();
    $stmt->close();

    if ($row) {
        $newStatus = $row["status"] == 1 ? 0 : 1;

        $update = $conn->prepare("UPDATE users SET status = ? WHERE id = ?");
        $update->bind_param("ii", $newStatus, $id);
        $update->execute();
        $update->close();

        echo json_encode(["success" => true, "id" => $id, "status" => $newStatus]);
    } else {
        echo json_encode(["success" => false, "error" => "Record not found"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid id"]);
}

$conn->close();
?>
