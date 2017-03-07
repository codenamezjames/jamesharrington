<?php 
	// Create connection
	$con = mysqli_connect("localhost","root","lavalamp1","jdh");

	// Check connection
	if (mysqli_connect_errno()){
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$name = mysql_escape_string($_POST["name"]);
	$phone = mysql_escape_string($_POST["phone"]);
	$email = mysql_escape_string($_POST["email"]);
	$message = mysql_escape_string($_POST["message"]);
	$budget = mysql_escape_string("2000");

	$compleat_message = $name . " ----- " . $phone . " ----- " . $email . " ----- " . $message;

	$sql="INSERT INTO messages (id, name, phone, email, message, budget) VALUES (DEFAULT, '$name', '$phone', '$email', '$message', '$budget')";
	if (mysqli_query($con,$sql)) {
		header("Location: /index.html#Thank you for your intereste! I will be in touch soon");
	}else{echo "Something went wrong.... are you sure you want to higher this guy? ;-) ";}
?>