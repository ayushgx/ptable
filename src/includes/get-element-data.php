<?php 

include 'connection.php';

if(isset($_POST['col_name'])) $col_name = $_POST['col_name'];

//$sql="INSERT INTO elements_data (theme_color) VALUES (?)";

$sql="SELECT $col_name FROM elements_data";

$stmt= $pdo->prepare($sql);

//$stmt->execute(array($data[$i]));

$stmt->execute();

$res = $stmt->fetchAll();

// echo $res.name;

$json = json_encode($res);
echo $json;

?>