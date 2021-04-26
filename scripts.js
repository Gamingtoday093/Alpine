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

// Hide video
var videohide = document.getElementById("videohide");
var videohideB = document.getElementById("videohide2");

function hidevideo() {
	videohide.style.animationName = "hidevideo";
	videohideB.style.animationName = "hidevideo";
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

// Shop Element Scroll
var storelist = document.getElementById("footer");
var buttonL = document.getElementById("footer");
var buttonR = document.getElementById("footer");
var maxscroll = $('#footer')[0].scrollWidth - $('#footer')[0].clientWidth;

function ScrollitemsR(list, bL, bR) {
	storelist = document.getElementById(list);
	maxscroll = $('#' + list)[0].scrollWidth - $('#' + list)[0].clientWidth;
	buttonL = document.getElementById(bL);
	buttonR = document.getElementById(bR);
	storelist.scrollLeft += 311;
	buttonL.style.display = "block";
	if ((storelist.scrollLeft + 311) >= maxscroll) {
		buttonR.style.display = "none";
	}
}

function ScrollitemsL(list, bL, bR) {
	storelist = document.getElementById(list);
	buttonL = document.getElementById(bL);
	buttonR = document.getElementById(bR);
	storelist.scrollLeft -= 311;
	buttonR.style.display = "block";
	if ((storelist.scrollLeft - 311) <= 0) {
		buttonL.style.display = "none";
	}
}

// Get Player Count
var text = document.getElementById("players");
var playercount = 0;

function getplayercount() {
	text.style.cursor = "progress";
	try {
		//unturned server status
		var url = "https://unturned-servers.net/api/?object=servers&element=detail&key=A8V57TBNKLVcGcABSMS5A26dWGDCMKKTgN5";
		$.when(
		$.getJSON(url),
		).done(function(result1, result2) {
		playercount = result1.players;
		$('#players').html("<i>" + playercount + '<b>/</b>28</i> Players Online');
		switch(true) {
		case (playercount <= 0):
		text.getElementsByTagName("I")[0].style.color = "#cccccc";
		break;
		case (playercount >= 28):
		text.getElementsByTagName("I")[0].style.color = "orangered";
		break;
		case (playercount > 16 && playercount < 28):
		text.getElementsByTagName("I")[0].style.color = "orange";
		break;
		case (playercount <= 16):
		text.getElementsByTagName("I")[0].style.color = "limegreen";
		break;
		}
		text.style.cursor = "pointer";
		});
	} catch(error) {
		console.log(error);
	}
}