<?php
$post = file_get_contents('php://input');
$user = json_decode($post)->user;
$values = json_decode($post)->values;
$tableType = json_decode($post)->tableType;
$username = $user->userName;
$password = $user->password;

try {
    $dbConnection = mysqli_connect("localhost", "$username", "$password", "maindatabase");

    echo json_encode(updateDataTable($values, $tableType, $dbConnection));

    $dbConnection->close();
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    die(json_encode(array('message' => "Error: " . $e->getMessage(), "status" => 500)));
}


function updateDataTable($values, $tableType, $dbConnection): string
{
    switch ($tableType) {
        case("NormaTable"):
            $sql = "UPDATE Norma SET ProductId = ('{$values->ProductId}'), FashionId = ('{$values->FashionId}'), RawId = ('{$values->RawId}'), CountOfRaw = ('{$values->CountOfRaw}') WHERE Id = ('{$values->Id}')";
            $dbConnection->query($sql);
            break;
        case ("RawTable"):
            $sql = "UPDATE Raw SET RawName = ('{$values->RawName}'), Unit = ('{$values->Unit}') WHERE Id = ('{$values->Id}')";
            $dbConnection->query($sql);
            break;
        case("ProductTable"):
            $sql = "UPDATE Product SET ProductName = ('{$values->ProductName}') WHERE Id = ('{$values->Id}')";
            $dbConnection->query($sql);
            break;
        case("FashionTable"):
            $sql = "UPDATE Fashion SET Id = ('{$values->FashionId}') WHERE Id = ('{$values->Id}')";
            $dbConnection->query($sql);
            break;
        case("PlanTable"):
            $sql = "UPDATE Plan SET FashionId = ('{$values->FashionId}'), PlanCount = ('{$values->PlanCount}') WHERE Id = ('{$values->Id}')";
            $dbConnection->query($sql);
            break;
    }

    return $tableType;
}