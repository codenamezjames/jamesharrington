<?php  
	if ($_POST['username'] == 'james' && $_POST['password'] == 'lavalamp1') {
		session_start();
		$_SESSION['username'] = $_POST['username'];
		header("Location: /admin/messages.php");
	}else{
		header("Location: /admin.html#Wrong username or password");
	}

?>