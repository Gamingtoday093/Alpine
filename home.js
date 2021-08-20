// Hide video
var videohide = document.getElementById("videohide");
var video = document.getElementById("video");
var loadingbar = document.getElementById("loading");

function hidevideo() {
	videohide.style.animationName = "hidevideo";
}

$('#video').ready(function() {
	try {
		loadingbar.style.display = "none";
	}
	catch {
	}
});

// Load video last
//$(function() {
    // <div id="container"></div> will be an empty div
    //$('#'+videohide).load('Hello');
//});
//var url2 = "https://cdn.discordapp.com/attachments/472407264700006420/836315564694962246/what.mp4";
//	$('#videohide').load(url2);
//$(window).ready(function() {
//	videohide.style.display = "block";
	//$('#videohide').load('/script');
//});

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

// Get Player Count
var text = document.getElementById("players");
var maintenanceIcon = document.getElementById("maintenance");
var playercount = 0;

function getplayercount() {
	text.style.cursor = "progress";
	try {
		//unturned server status
		var url = "https://unturned-servers.net/api/?object=servers&element=detail&key=Gjb5A2qJm0sorkdNEtlvDzcNGDNT8MUvv1k";
		$.when(
		$.getJSON(url),
		).done(function(result1, result2) {
		playercount = result1.players;
		maxplayers = result1.maxplayers;
		$('#players').html("<i>" + playercount + '<b>/</b>' + maxplayers +'</i> Players Online');
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
		text.getElementsByTagName("I")[0].style.color = "rgb(64, 191, 105)";
		break;
		}
		text.style.cursor = "pointer";
		if (result1.password == true) {
			maintenanceIcon.style.display = "block";
		}
		});
	} catch(error) {
		console.log(error);
		alert(error);
	}
}