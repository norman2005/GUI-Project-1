<?php

$name = $_POST['name'];
$userpassword = $_POST['password'];

$username = "jcaravet";
$password = "jc6605";

//This is the name of the database.
$db = "jcaravet";

session_start();

//This will try to connect to mysql.
mysql_connect("localhost", $username, $password) or die();

//This will try to connect to the jcaravet database.
mysql_select_db($db) or die();

$result = mysql_query("SELECT * FROM users WHERE username = '$name';");

if (mysql_num_rows($result) == 1){
$result = mysql_query("SELECT * FROM users WHERE userpassword = '$userpassword';");
if (mysql_num_rows($result) == 1){
$_SESSION ['username']=$name;
echo json_encode("true");
}else {
echo json_encode("false");
}
} else{
echo json_encode("false");
}
?>