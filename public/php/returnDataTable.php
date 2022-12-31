<?php
function returnDataTable($res): array
{
    $table = array();
    if ($res->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            array_push($table, $row);
        }
    }
    return $table;
}