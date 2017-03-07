<?php 
	session_start();
	session_destroy();
	header("Location: /index.html#Your Logged out");
?>