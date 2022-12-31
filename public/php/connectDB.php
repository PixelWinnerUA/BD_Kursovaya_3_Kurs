<?php

$post = file_get_contents('php://input');
$username = json_decode($post)->userName;
$password = json_decode($post)->password;

try {
    $dbConnection = mysqli_connect("localhost", "$username", "$password", "maindatabase");

    echo json_encode(array("message" => "Success!"));
    $dbConnection->close();
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    die(json_encode(array('message' => "Error: " . $e->getMessage(), "status" => 500)));
}


