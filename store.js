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

// Add to Cart
var notif = document.getElementById("cartnotification");
var carticon = document.getElementById("items");
var removebuttontext = "<button class='removeitem'><i class='fas fa-times' onclick='removefromcart(";
var item = "(Cartitem)";
let cart = [];
var totalprice = 0;
var cartlist = document.getElementById("cartlist");
let hasDuplicate = cart.some((val, i) => cart.indexOf(val) !== i);

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
			cartlist.innerHTML += "<tr><td>" + cart[i][0] + removebuttontext + [i] + ")'></i></button></td><td class='pricetd'>" + cart[i][1] + "$</td></tr>";
			totalprice = totalprice + parseInt(cart[i][1]);
		}
		cartlist.innerHTML += "<tfoot><tr><td>Total Price</td><td class='pricetd'>" + totalprice + "$</td></tr></tfoot>";
		//console.table(cart);
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

  paypal.Buttons({
    createOrder: function(data, actions) {
      // This function sets up the details of the transaction, including the amount and line item details.
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: totalprice
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      // This function captures the funds from the transaction.
      return actions.order.capture().then(function(details) {
        // This function shows a transaction success message to your buyer.
        alert('Transaction completed! Thank you, ' + details.payer.name.given_name + ' for your donation!');
      });
    }
  }).render('#paypalbuttons');
  //This function displays Smart Payment Buttons on your web page.

// Remove from cart
function removefromcart(itemindex) {
	cart.splice(itemindex, 1);
	carticon.innerHTML = cart.length;
	totalprice = 0;
	cartlist.innerHTML = "<thead><tr><th>Items (" + cart.length + ")</th><th class='pricetd'>Price $</th></tr></thead>";
	for (i = 0, size = cart.length; i < size; i++) {
		cartlist.innerHTML += "<tr><td>" + cart[i][0] + removebuttontext + [i] + ")'></i></button></td><td class='pricetd'>" + cart[i][1] + "$</td></tr>";
		totalprice = totalprice + parseInt(cart[i][1]);
	}
	cartlist.innerHTML += "<tfoot><tr><td>Total Price</td><td class='pricetd'>" + totalprice + "$</td></tr></tfoot>";
}

// Go to Checkout
var checkoutblock = document.getElementById("checkout");
var checkoutblur = document.getElementById("checkoutbakground");

function gotocheckout() {
	if (checkoutblock.style.display === "block") {
		checkoutblock.style.display = "none";
		checkoutblur.style.display = "none";
	} else {
		checkoutblock.style.display = "block";
		checkoutblock.style.animationName = "hidevideo";
		checkoutblur.style.display = "block";
		checkoutblur.style.animationName = "showcheckoutbak";
	}
}

//Goal
var goaltext = document.getElementById("goaltext");
var progress = document.getElementById("progress");
var goal = "Monthly upkeep cost";
var amount = 5;
var amountgoal = 20;

goaltext.innerHTML = goal + " - " + amount + "/" + amountgoal + "$";
progress.style.width = ((amount / amountgoal) * 100) + "%";
