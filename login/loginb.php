<?php
  echo $wallet = $_POST['user'];
  session_start();
  $_SESSION["wallet"] = $wallet;
header("Location: http://www.ethanoltoken.com/v23"); 

?>