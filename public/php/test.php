<?php
$dbConnection = include("getNorma.php");
$sql = "SELECT * FROM Norma";
$queryResult = $dbConnection->query($sql);

echo json_encode(returnDataTable($queryResult));