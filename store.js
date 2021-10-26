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
	storelist.scrollLeft += 500;
	buttonL.style.display = "block";
	if ((storelist.scrollLeft + 500) >= maxscroll) {
		buttonR.style.display = "none";
	}
}

function ScrollitemsL(list, bL, bR) {
	storelist = document.getElementById(list);
	buttonL = document.getElementById(bL);
	buttonR = document.getElementById(bR);
	storelist.scrollLeft -= 500;
	buttonR.style.display = "block";
	if ((storelist.scrollLeft - 500) <= 0) {
		buttonL.style.display = "none";
	}
}

function showscroll() {
	width = document.getElementById("maxstoreitems");
	bR = document.getElementById("bundlebuttonR");
	bL = document.getElementById("bundlebuttonL");
	iR = document.getElementById("itembuttonR");
	iL = document.getElementById("itembuttonL");
	if (width.clientWidth == "1350") {
		bR.style.display = "none";
		bL.style.display = "none";
		iR.style.display = "none";
		iL.style.display = "none";
	} else {
		bR.style.display = "block";
		iR.style.display = "block";
	}
}

// Add to Cart
var notif = document.getElementById("cartnotification");
var carticon = document.getElementById("items");
var removebuttontext = "<button class='removeitem'><i class='fas fa-times' title='Remove Item' onclick='removefromcart(";
var item = "(Cartitem)";
let cart = [];
var totalprice = 0;
var totalpricebefore = 0;
var cartlist = document.getElementById("cartlist");

function addtocart(item, price) {
	if (item === undefined || price === undefined) {
		notif.getElementsByTagName("H1")[0].innerHTML = "Failed to Add! <p></p>";
		notif.getElementsByTagName("P")[0].innerHTML = 'Failed to add <u>' + item + "</u> to cart";
	} else {
		cart.push([item,price]);
		notif.getElementsByTagName("H1")[0].innerHTML = "Added to Cart! <p></p>";
		notif.getElementsByTagName("P")[0].innerHTML = 'Succesfully added <u>' + item + "</u> to cart";
		carticon.innerHTML = cart.length;
		totalprice = 0;
		cartlist.innerHTML = "<thead><tr><th>Items (" + cart.length + ")</th><th class='pricetd'>Price $</th></tr></thead>";
		for (i = 0, size = cart.length; i < size; i++) {
			cartlist.innerHTML += "<tr><td>" + cart[i][0] + removebuttontext + [i] + ")'></i></button></td><td class='pricetd'>$" + cart[i][1] + "</td></tr>";
			totalprice = totalprice + parseFloat(cart[i][1]);
		}
		getDiscount();
		if (discount < 1) {
			totalpricebefore = totalprice;
			totalprice = totalpricebefore - (totalpricebefore * discount);
			totalprice = totalprice.toFixed(2);
			cartlist.innerHTML += "<tfoot><tr><td>Total Price</td><td class='pricetd'><i class='smallerdiscount'>" + dis + "% off! -</i> $" + totalprice + " / <del>$" + totalpricebefore + "</del></td></tr></tfoot>";
		} else {
			cartlist.innerHTML += "<tfoot><tr><td>Total Price</td><td class='pricetd'>$" + totalprice + "</td></tr></tfoot>";
			//console.table(cart);
		}
	}

	// Animations
	if (notif.style.animationName === "shownotif") {
	clearTimeout(toclear);
	toclear = setTimeout(() => { notif.style.animationName = "hidevideo"; }, 2000);
	} else {
	notif.style.animationName = "shownotif";
	toclear = setTimeout(() => { notif.style.animationName = "hidevideo"; }, 2000);
	}
}

// Generate Items
var gItems = document.getElementsByClassName("generateItem");
generateItems();
function generateItems() {
	for (var i = 0; i < gItems.length; i++) {
		const newDiv = document.createElement("div");
		const itemType = document.createElement("h3");
		switch (gItems[i].className.split(" ")[0]) {
			case "kit":
				itemType.appendChild(document.createTextNode("Kit skin"));
				break;
			case "bundle":
				itemType.appendChild(document.createTextNode("Kit bundle"));
				break;
			case "OneTime":
				itemType.appendChild(document.createTextNode("Kit skin (One Time)"));
				break;
			case "perk":
				itemType.appendChild(document.createTextNode("Perk"));
				break;
		}

		newDiv.className = "iteminfogrid";
		newDiv.appendChild(itemType);

		var price = gItems[i].getElementsByClassName("price")[0].innerHTML;
		const priceDiv = document.createElement("div");
		const priceImg = document.createElement("img");
		const pricespaceP = document.createElement("p");
		const priceP = document.createElement("p");
		priceDiv.className = "price";
		priceImg.src = "styles/images/dollar-signs-icon.png";
		priceImg.alt = "Currency";
		priceImg.width = "20";
		priceImg.height = "20";
		pricespaceP.className = "pricespace";
		pricespaceP.innerHTML = "Price:";
		priceP.className = "getprice";
		priceP.innerHTML = `${price}`

		priceDiv.appendChild(priceImg);
		priceDiv.appendChild(pricespaceP);
		priceDiv.appendChild(priceP);
		newDiv.appendChild(priceDiv);

		var name = gItems[i].getElementsByClassName("name")[0].innerHTML;
		var kit = gItems[i].getElementsByClassName("kit")[0].innerHTML;
		var content = gItems[i].getElementsByClassName("content")[0].innerHTML;
		var cooldown = gItems[i].getElementsByClassName("cooldown")[0].innerHTML;
		const statsDiv = document.createElement("div");
		const kitP = document.createElement("p");
		const contentP = document.createElement("p");
		const cooldownP = document.createElement("p");
		const buyButton = document.createElement("button");
		statsDiv.className = "ingamestats";
		kitP.innerHTML = `Kit: <code>/kit ${kit}</code>`
		contentP.innerHTML = `Contents: <code>${content}</code>`
		cooldownP.innerHTML = `Cooldown: <code>${cooldown}</code>`
		buyButton.innerHTML = "Add to Cart <i class='fas fa-shopping-cart' aria-hidden='true'></i>"
		buyButton.setAttribute("onclick", `addtocart('${name}', '${price}')`);

		statsDiv.appendChild(kitP);

		var isTeam = gItems[i].getElementsByClassName("team");
		if (isTeam.length > 0) {
			var team = isTeam[0].innerHTML;
			const teamP = document.createElement("p");
			teamP.innerHTML = `Team Specific: <code>${team}</code>`
			statsDiv.appendChild(teamP);
		}

		statsDiv.appendChild(contentP);
		statsDiv.appendChild(cooldownP);
		statsDiv.appendChild(buyButton);
		newDiv.appendChild(statsDiv);

		var isLimited = gItems[i].getElementsByClassName("limited");
		if (isLimited.length > 0) {
			var limited = isLimited[0].innerHTML;
			const limitedP = document.createElement("p");
			limitedP.className = "limited";
			limitedP.innerHTML = limited;
			newDiv.appendChild(limitedP);
		}

		const descP = document.createElement("p");
		descP.innerHTML = gItems[i].getElementsByClassName("desc")[0].innerHTML;
		newDiv.appendChild(descP);

		const titleText = document.createElement("h2");
		titleText.innerHTML = `${name}<div class='price'><p class="getprice">${price}</p></div>`;

		gItems[i].innerHTML = "";
		gItems[i].appendChild(newDiv);
		gItems[i].appendChild(titleText);
	}
}

// Get prices
// xe.com
var euromultiplier = 0.85240782;
var poundmultiplier = 0.72181503;
var prices = document.getElementsByClassName("getprice");
getprice();
function getprice() {
	for (var i = 0; i < prices.length; i++) {
		var price = parseFloat(prices[i].innerHTML);
		var priceEuro = (price * euromultiplier).toFixed(2);
		var pricePound = (price * poundmultiplier).toFixed(2);
		var extra = prices[i].firstElementChild;
		if (extra === null) {
			extra = "";
		} else {
			extra = "<i class='far fa-clock'></i>";
		}
		prices[i].innerHTML = "$" + price + " / " + priceEuro + "€ / £" + pricePound + " " + extra;
		prices[i].style.display = "block";
	}
}

// Calculate Discount
var dis = 0;
var discount = 1;

function getDiscount() {
	if (dis <= 0) {
		discount = 1;
	} else {
	dis = dis / 100;
	discount = dis;
	dis = dis * 100;
	}
}

// USD, EUR, GBP
var currencyCode = "USD";
var allitemsstring = '';

function allitemstostring() {
	allitemsstring = "";
	for (var i = 0; i < cart.length; i++) {
		allitemsstring += ("(" + cart[i][0] + " " + cart[i][1] + ") ");
	}
	if (allitemsstring.length > 128) {
		alert("Warning! Your order is too large for our systems, please shorten your order to complete your purchase!");
	}
}

paypal.Buttons({
  createOrder: function(data, actions) {
    // This function sets up the details of the transaction, including the amount and line item details.
    var steamid64string = 'SteamID64 - ' + steamid64.value;
    var couponstring = 'Coupon code - ' + document.getElementById("coupon").value + ' - ' + dis + '% off';
    allitemstostring();
    return actions.order.create({
      purchase_units: [{
        amount: {
        	currency_code: currencyCode,
          value: totalprice,
          application_context: {
						shipping_preference: 'NO_SHIPPING'
					},
          breakdown: {
          	item_total: {value: totalprice, currency_code: currencyCode}
          }
        },
        items: [{
        	name: steamid64string,
        	unit_amount: {value: '0', currency_code: currencyCode},
        	quantity: '1',
        	sku: '01'
        }, {
        	name: allitemsstring,
        	unit_amount: {value: totalprice, currency_code: currencyCode},
        	quantity: '1',
        	sku: '02'
        }, {
        	name: couponstring,
        	unit_amount: {value: '0', currency_code: currencyCode},
        	quantity: '1',
        	sku: '03'
        }],
    	}],
    	application_context: {
      	shipping_preference: 'NO_SHIPPING'
      },
      web_profile: [{
        "input_fields": {
 				  "no_shipping": 1,
  				"address_override": 0
				}
      }]
    });
	},
  onApprove: function(data, actions) {
    // This function captures the funds from the transaction.
    return actions.order.capture().then(function(details) {
      // This function shows a transaction success message to your buyer.
      dis = 0;
			discount = 1;
			steamid64.value = "";
			document.getElementById("coupon").value = "";
			cart = [];
			carticon.innerHTML = cart.length;
			totalprice = 0;
			cartlist.innerHTML = "<thead><tr><th>Items (" + cart.length + ")</th><th class='pricetd'>Price $</th></tr></thead>";
			cartlist.innerHTML += "<tfoot><tr><td>Total Price</td><td class='pricetd'>$" + totalprice + "</td></tr></tfoot>"
      alert('Transaction completed! Thank you, ' + details.payer.name.given_name + ' for your donation!');
    });
  },
  style: {
    layout:  'vertical',
    color:   'gold',
    shape:   'rect',
    label:   'paypal'
  }
}).render('#paypalbuttons');

// Remove from cart
function removefromcart(itemindex) {
	cart.splice(itemindex, 1);
	carticon.innerHTML = cart.length;
	totalprice = 0;
	cartlist.innerHTML = "<thead><tr><th>Items (" + cart.length + ")</th><th class='pricetd'>Price $</th></tr></thead>";
	for (i = 0, size = cart.length; i < size; i++) {
		cartlist.innerHTML += "<tr><td>" + cart[i][0] + removebuttontext + [i] + ")'></i></button></td><td class='pricetd'>$" + cart[i][1] + "</td></tr>";
		totalprice = totalprice + parseInt(cart[i][1]);
	}
	getDiscount();
	if (discount < 1) {
	totalpricebefore = totalprice;
	totalprice = totalpricebefore - (totalpricebefore * discount);
	totalprice = totalprice.toFixed(2);
	cartlist.innerHTML += "<tfoot><tr><td>Total Price</td><td class='pricetd'><i class='smallerdiscount'>" + dis + "% off! -</i> $" + totalprice + " / <del>$" + totalpricebefore + "</del></td></tr></tfoot>";
	} else {
	cartlist.innerHTML += "<tfoot><tr><td>Total Price</td><td class='pricetd'>$" + totalprice + "</td></tr></tfoot>";
	}
}

// Go to Checkout
var checkoutblock = document.getElementById("checkout");
var checkoutblur = document.getElementById("checkoutbakground");

function gotocheckout() {
	if (checkoutblock.style.display === "block") {
		checkoutblock.style.display = "none";
		checkoutblur.style.display = "none";
		document.body.style.overflow = "auto";
	} else {
		checkoutblock.style.display = "block";
		checkoutblock.style.animationName = "hidevideo";
		checkoutblur.style.display = "block";
		checkoutblur.style.animationName = "showcheckoutbak";
		document.body.style.overflow = "hidden";
	}
}

// Approve Terms before Checkout
var checkboxapprove = document.getElementById("storetermscheck");
var paypalblock = document.getElementById("paypalbuttons");
var storeterms = document.getElementById("storeterms");
var steamid64 = document.getElementById("steamid64");

function showpaypal() {
	if(checkboxapprove.checked === true && totalprice === 0) {
		paypalblock.style.display = "none";
		storeterms.style.height = "300px";
		storeterms.style.padding = "0 0.5em 0.5em 0.5em";
		checkboxapprove.checked = false;
		alert("Your Cart is Empty!");
		return;
	}

	if (steamid64.value.length === 0) {
		paypalblock.style.display = "none";
		storeterms.style.height = "300px";
		storeterms.style.padding = "0 0.5em 0.5em 0.5em";
		checkboxapprove.checked = false;
		alert("Remember to fill in your SteamID64");
		steamid64.style.outlineColor = "red";
		steamid64.style.outlineStyle = "auto";
		return;
	}

	if (steamid64.value.length > 17 || isDeprecated(steamid64.value, "steam") === true) {
		paypalblock.style.display = "none";
		storeterms.style.height = "300px";
		storeterms.style.padding = "0 0.5em 0.5em 0.5em";
		checkboxapprove.checked = false;
		alert("Please fill in a valid SteamID64");
		steamid64.style.outlineColor = "red";
		steamid64.style.outlineStyle = "auto";
		return;
	}

	if (checkforduplicates() === true) {
		alert("Warning! We've detected duplicate items in your purchase, unless you intend to gift an item to a friend we suggest you remove them as you may only have one specific item per steam account!")
	}

	if (checkboxapprove.checked === true) {
		paypalblock.style.display = "block";
		storeterms.style.height = "0px";
		storeterms.style.padding = "0";
	}

	if (checkboxapprove.checked === false) {
		paypalblock.style.display = "none";
		storeterms.style.height = "300px";
		storeterms.style.padding = "0 0.5em 0.5em 0.5em";
	}
	allitemstostring();
}

// phptesting
//var phptest = document.getElementById("phptest");
//var result = "";
//phptest.innerHTML = "";
//var xmlhttp = new XMLHttpRequest();
//xmlhttp.onreadystatechange = function() {
//	if (this.readyState == 4 && this.status == 200) {
//		result = this.responseText;
//	}
//};
//var coupon = "test";
//xmlhttp.open("GET", "dbhandler.php?c="+coupon, true);
//xmlhttp.send();
//
//if (result === "true") {
//	phptest.innerHTML = "TRUE"
//} else if (result === "false") {
//	phptest.innerHTML = "FALSE"
//}

function clearattention() {
	steamid64.style = "";
}

function checkforduplicates() {
	if (cart.length == 0) {
		return false;
	}
	let unique = [];
	for (var i = cart.length - 1; i >= 0; i--) {
		if (unique.includes(cart[i][0])) {
			return true;
		} else {
			unique.push(cart[i][0]);
		}
	}
	return false;
}

// Check Validity of steamID64 and Coupon
var steamid64ValidityIcon = document.getElementById("steamid64validity");
var couponValidityIcon = document.getElementById("couponvalidity");

document.getElementsByTagName("input")[0].addEventListener('change', checkValidity);
document.getElementsByTagName("input")[1].addEventListener('change', checkValidity);

function checkValidity(e) {
	if (e.target.name == "steamid64") {
		//console.log(e.target.value.length);
		if (e.target.value.length === 17 && isDeprecated(e.target.value, "steam") === false) {
			steamid64ValidityIcon.style = "";
			steamid64ValidityIcon.classList.remove("fa-times-circle");
			steamid64ValidityIcon.classList.add("fa-check-square");
			steamid64ValidityIcon.style.color = "limegreen";
			steamid64ValidityIcon.style.visibility = "visible";
			steamid64ValidityIcon.style.opacity = "1";
			steamid64ValidityIcon.style.animationName = "hidevideo";
		}	else if (e.target.value.length > 0) {
			steamid64ValidityIcon.style = "";
			steamid64ValidityIcon.classList.remove("fa-check-square");
			steamid64ValidityIcon.classList.add("fa-times-circle");
			steamid64ValidityIcon.style.color = "orangered";
			steamid64ValidityIcon.style.visibility = "visible";
			steamid64ValidityIcon.style.opacity = "1";
		} else {
			steamid64ValidityIcon.style.visibility = "collapse";
			steamid64ValidityIcon.style.opacity = "0";
		}
	}	else if (e.target.name == "coupon") {
		if (verifyCoupon(e.target.value) == true) {
			couponValidityIcon.style = "";
			couponValidityIcon.classList.remove("fa-times-circle");
			couponValidityIcon.classList.add("fa-check-square");
			couponValidityIcon.style.color = "limegreen";
			couponValidityIcon.style.visibility = "visible";
			couponValidityIcon.style.opacity = "1";
			couponValidityIcon.style.animationName = "hidevideo";
			getDiscount();
			if (discount < 1) {
				totalpricebefore = 0;
				for (i = 0, size = cart.length; i < size; i++) {
					totalpricebefore = totalpricebefore + parseInt(cart[i][1]);
				}
				totalprice = totalpricebefore - (totalpricebefore * discount);
				totalprice = totalprice.toFixed(2);
				cartlist.getElementsByTagName("TFoot")[0].innerHTML = "<tr><td>Total Price</td><td class='pricetd'><i class='smallerdiscount'>" + dis + "% off! -</i> $" + totalprice + " / <del>$" + totalpricebefore + "</del></td></tr>";
			}
		} else if (e.target.value.length > 0 && verifyCoupon(e.target.value) == false) {
			couponValidityIcon.style = "";
			couponValidityIcon.classList.remove("fa-check-square");
			couponValidityIcon.classList.add("fa-times-circle");
			couponValidityIcon.style.color = "orangered";
			couponValidityIcon.style.visibility = "visible";
			couponValidityIcon.style.opacity = "1";
			getDiscount();
			if (discount != 1) {
				totalprice = 0;
				for (i = 0, size = cart.length; i < size; i++) {
					totalprice = totalprice + parseInt(cart[i][1]);
				}
				cartlist.getElementsByTagName("TFoot")[0].innerHTML = "<tr><td>Total Price</td><td class='pricetd'>$" + totalprice + "</td></tr>";
		 	}
		} else {
			couponValidityIcon.style.visibility = "collapse";
			couponValidityIcon.style.opacity = "0";
			getDiscount();
			if (discount != 1) {
				totalprice = 0;
				for (i = 0, size = cart.length; i < size; i++) {
					totalprice = totalprice + parseInt(cart[i][1]);
				}
				cartlist.getElementsByTagName("TFoot")[0].innerHTML = "<tr><td>Total Price</td><td class='pricetd'>$" + totalprice + "</td></tr>";
		 	}
		}
	}
}

function verifyCoupon(couponString) {
	if (isDeprecated(couponString, "coupon") === false) {
		if (couponString.length === 22 || couponString.length === 9) {
			try {
				var possibleValues = 0;
				if (couponString.charAt(0) != "a") {
					possibleValues = couponString.match(/\d+/)[0] * 2;
				} else {
					possibleValues = couponString.match(/\d+/)[0] / couponString.match(/y/g).length;
				}
				if (couponString.match(/w/g).length >= 4 | couponString.match(/h/g).length <= 2) {
					var es = Math.exp(-2 * possibleValues)
					var prime = -2 * es * couponString.match(/q/g).length;
					if ((prime + (2 * es)) === 0) {
						dis = possibleValues;
						return true;
					} 
				}
			} catch(error) {
				//console.log(error);
				return false;
			}
		}
	}
	return false;
}

const deprecatedCouponArray = ["alpinesusyyb42qwhhuvxp", "y20y6tqhw", "testingcqde123", "q10ALPINEwhwyyj293ai26"];
const deprecatedSteamID64Array = ["99999999999999999"];

function isDeprecated(valueString, type) {
	if (type === "coupon") {
		for (var i = deprecatedCouponArray.length - 1; i >= 0; i--) {
			if (deprecatedCouponArray[i] === valueString) {
				return true;
			}
		}
	} else if (type === "steam") {
		for (var i = deprecatedSteamID64Array.length - 1; i >= 0; i--) {
			if (deprecatedSteamID64Array[i] === valueString) {
				return true;
			}
		}
	}
	return false;
}

// Goal
var goaltext = document.getElementById("goaltext");
var progress = document.getElementById("progress");
var goal = "Monthly upkeep cost";
var amount = 0;
var amountgoal = 19.65;

goaltext.innerHTML = goal + " - " + amount + "/" + amountgoal + "$";
progress.style.width = ((amount / amountgoal) * 100) + "%";
