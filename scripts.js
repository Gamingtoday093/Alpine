// Mobile Menu Script
var button = document.getElementById("MenuButton");
var image = document.getElementById("MenuButtonImage");
var imageX = document.getElementById("MenuButtonImage2");
var menu = document.getElementById("mobilemenu");

function ShowMenu() {
if (menu.style.display === "none") {
	menu.style.display = "block";
	button.style.transform = "rotatez(-180deg)";
	image.style.transform = "scaleY(0)";
	imageX.style.transform = "scaleY(1)";
} else {
	menu.style.display = "none";
	button.style.transform = "rotatez(0deg)";
	image.style.transform = "scaleY(1)";
	imageX.style.transform = "scaleY(0)";
}
}

// Article Mobile Friendly Script
var article1 = document.getElementById("Article1");
var article2 = document.getElementById("Article2");
function resizewin() {
if($(window).width() <= 1048) {
	article1.style.display = "block";
	article2.style.display = "block";
} else {
	article1.style.display = "flex";
	article2.style.display = "flex";
}
}