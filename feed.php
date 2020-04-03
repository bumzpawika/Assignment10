<?php
session_start();
	// complete this : check ว่ามีการ login หรือยัง โดยเช็คจาก username ถ้ายังให้กลับไปที่ index.html
	if (!isset($_SESSION["username"])){
		header("location: index.html");
		exit(0);
	}
$username = $_SESSION["username"];

?>

<script type="text/javascript"> 
	var username = "<?php echo $username?>";
</script> 

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Login</title>
		<link type="text/css" rel="stylesheet" href="css/stylefeed.css">
		<script type="text/javascript" src="js/feed.js"></script>
	</head>
	<body>
		<div class="grid-container">
			<div class="item1">
				<div id="browsePic">
					<div id="displayPic">
						<img id="Profile" alt="">
					</div>
					<form action="js/uploadPic.php" method="post" id="formId" enctype="multipart/form-data">
						<input type="file" id="fileField" name="fileToUpload" value="fileToUpload" placeholder="" class="hidden">
					</form>
				</div>
				Hello <?php echo $username ?>, Welcome back!
			</div>
  			<div class="item2"> <a href="js/logout.php"> Logout</a> </div>
  			<div class="item3">
  				<div id="posting">
  					<textarea name="msg" id="textmsg" value="" placeholder="" rows="4" cols="50"></textarea>
					<br>
  					<button id="postbutton">Post</button>
  				</div>
  				<hr>
  				<div id="feed-container">
  					
  				</div>	
  			</div>  
		</div>
	
	</body>
</html>
