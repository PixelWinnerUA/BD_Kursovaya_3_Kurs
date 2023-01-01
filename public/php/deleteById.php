<?php

$post = file_get_contents('php://input');
$user = json_decode($post)->user;
$Id = json_decode($post)->Id;
$tableType = json_decode($post)->tableType;
$username = $user->userName;
$password = $user->password;

try {
    $dbConnection = mysqli_connect("localhost", "$username", "$password", "maindatabase");

    echo json_encode(deleteById($Id, $tableType, $dbConnection));

} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    die(json_encode(array('message' => "Error: " . $e->getMessage(), "status" => 500)));
}


function deleteById($Id, $tableType, $dbConnection): string
{
    switch ($tableType) {
        case("NormaTable"):
            $sql = "DELETE FROM Norma WHERE Id = ('{$Id}');";
            $dbConnection->query($sql);
            break;
        case ("RawTable"):
            $sql = "DELETE FROM Raw WHERE Id = ('{$Id}');";
            $dbConnection->query($sql);
            break;
        case("ProductTable"):
            $sql = "DELETE FROM Product WHERE Id = ('{$Id}');";
            $dbConnection->query($sql);
            break;
        case("FashionTable"):
            $sql = "DELETE FROM Fashion WHERE Id = ('{$Id}');";
            $dbConnection->query($sql);
            break;
        case("PlanTable"):
            $sql = "DELETE FROM Plan WHERE Id = ('{$Id}');";
            $dbConnection->query($sql);
            break;
    }

    return $tableType;
}