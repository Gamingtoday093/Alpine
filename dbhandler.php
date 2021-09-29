<?php

$serverName = "jdbc:mysql://u660_14N6khWoP2:^SC!GnaqkjK!Ll0!Nhy=StxF@116.202.241.175:3306/s660_Test";
$dBUsername = "u660_14N6khWoP2";
$dBPassword = "^SC!GnaqkjK!Ll0!Nhy=StxF";
$dBName = "s660_Test";

$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}

$c = $_GET['c'];

//mysqli_select_db($conn,"AlpineCoupon_data");
$sql = "SELECT * FROM AlpineCoupon_data WHERE Coupon = '".$c."'";

$result = mysqli_query($conn, $sql);

if (!$result) {
	echo "Not a Coupon";
}
else {
	echo "Coupon";
}

mysqli_close($conn);