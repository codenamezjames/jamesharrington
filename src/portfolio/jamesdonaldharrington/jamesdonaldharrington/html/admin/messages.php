<?php 
	session_start();
	if (!isset($_SESSION['username'])) {
		header('Location: /admin.html#You Must Login');
	}
?>
<!doctype html>
<html lang="en">

<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/css/screen.css">
<title>James Harrington</title>

</head>

<body>
	
	<header>
	</header>

	<article>
		<div class="row">
			<div class="large-10 large-centered column">
				<h2>Messages</h2> <span><a href="/php/logout.php">Logout</a></span>
				<table style="width:100%; overflow:scroll;">
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Message</th>
						<th>Budget</th>
					</tr>
				
				<?php 
								// Create connection
					$con = mysqli_connect("localhost","root","lavalamp1","jdh");

					// Check connection
					if (mysqli_connect_errno()){
						echo "Failed to connect to MySQL: " . mysqli_connect_error();
					}

					$result = mysqli_query($con,"SELECT * FROM messages");

					$i = 0;
					while($row = mysqli_fetch_array($result)){
					    echo "<tr>";
					    	echo "<td>".$row[0]."</td>";
					    	echo "<td>".$row[1]."</td>";
					    	echo "<td>".$row[2]."</td>";
					    	echo "<td>".$row[3]."</td>";
					    	echo "<td>".$row[4]."</td>";
					    	echo "<td>".$row[5]."</td>";
					    	echo "<td>".$row[6]."</td>";
					    echo "</tr>";
					    $i++;
					}

				 ?>
				 </table>
			</div>
		</div>
	</article>

	<div class="push">
	</div>

	<footer>
	</footer>

	<script src="/js/vendor/custom.modernizr.js"></script>
	<script src="/js/vendor/jquery.js"></script>
	<script src="/js/vendor/placeholder.js"></script>
	<script src="/js/foundation.min.js"></script>
	<script src="/js/main.js"></script>

</body>
</html>