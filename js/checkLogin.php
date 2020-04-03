<?php
	session_start();
	$username = $_GET["username"];
	$password = $_GET["password"];

	$json = fopen("userDB.json","r");
	$jsonr = fread($json,filesize("userDB.json"));
	$file = json_decode($jsonr,true);
	fclose($json);

	foreach($file as $user => $val){
		if($val["username"] == $username){
			if($val["password"] == $password){
				$_SESSION["username"] = $username;
				$_SESSION["password"] = $password;
				header("location: ../feed.php");
				exit();
			}
		}
		
	}
	header("location: ../index.html");
	exit();
	//complete this file
	// ทำได้โดยเริ่มจากอ่านไฟล์ userDB.json วน  foreach loop ถ้าตรงทั้ง password และ username ให้ redirect ไปที่ feed.php แต่ถ้าไม่ตรงให้ กลับไปที่ index.html?error=1
?>