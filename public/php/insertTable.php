<?php

$post = file_get_contents('php://input');
$user = json_decode($post)->user;
$values = json_decode($post)->values;
$tableType = json_decode($post)->tableType;
$username = $user->userName;
$password = $user->password;

try {
    $dbConnection = mysqli_connect("localhost", "$username", "$password", "maindatabase");

    echo json_encode(insertInDataTable($values, $tableType, $dbConnection));

} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    die(json_encode(array('message' => "Error: " . $e->getMessage(), "status" => 500)));
}


function insertInDataTable($values, $tableType, $dbConnection): string
{
    switch ($tableType) {
        case("NormaTable"):
            $sql = "INSERT INTO Norma (ProductId, FashionId, RawId, CountOfRaw) VALUES (('{$values->ProductId}'), ('{$values->FashionId}'), ('{$values->RawId}'), ('{$values->CountOfRaw}'))";
            $dbConnection->query($sql);
            break;
        case ("RawTable"):
            $sql = "INSERT INTO Raw (RawName, Unit) VALUES (('{$values->RawName}'), ('{$values->Unit}'))";
            $dbConnection->query($sql);
            break;
        case("ProductTable"):
            $sql = "INSERT INTO product (ProductName) VALUES (('{$values->ProductName}'))";
            $dbConnection->query($sql);
            break;
        case("FashionTable"):
            $sql = "INSERT INTO Fashion (Id) VALUES (('{$values->FashionId}'))";
            $dbConnection->query($sql);
            break;
        case("PlanTable"):
            $sql = "INSERT INTO Plan (FashionId, PlanCount) VALUES (('{$values->FashionId}'), ('{$values->PlanCount}'))";
            $dbConnection->query($sql);
            break;
    }

    return $tableType;
}