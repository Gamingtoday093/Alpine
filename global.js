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
