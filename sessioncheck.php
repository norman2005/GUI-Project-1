<?php
session_start();

//here we put a welcome screen and also a Logout link to logout page
if ($_SESSION['username']){
echo $_SESSION ['username'];
}
else {
echo json_encode(false);

}
?>