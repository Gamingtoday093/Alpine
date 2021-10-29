// Keep Selected Plan Open
function keepplanopen(id, removeid) {
var openplan = document.getElementById(id);
var infoplan = openplan.getElementsByClassName("infoplan")[0];
openplan.style.width = "75%";
openplan.style.justifyContent = "flex-start";
infoplan.style.opacity = "1";
infoplan.style.height = "300px";
infoplan.style.visibility = "visible";

var hideplan = document.getElementById(removeid);
var hideinfoplan = hideplan.getElementsByClassName("infoplan")[0];
hideplan.style = "";
hideinfoplan.style = "";
}