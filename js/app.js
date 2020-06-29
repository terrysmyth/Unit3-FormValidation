// ROLE ROLE
const title = document.getElementById("title");
const otherTitle = document.getElementById("other-title");
otherTitle.style.display = "none";

// SHIRTS
const design = document.getElementById("design");
const color = document.getElementById("color");
color.innerHTML = '<option value="">Please select a T-shirt theme</option>';

// CHECKBOXES
const inputs = document.querySelectorAll("input[type='checkbox'");
const total = document.querySelector("#total");
let runningTotal = 0;

// PAYMENT
const payment = document.getElementById("payment");
const methods = document.getElementsByClassName("methods");
methods[1].style.display = "none";
methods[2].style.display = "none";

// FORM
const form = document.getElementsByTagName("form")[0];
const name = document.getElementById("name");
const mail = document.getElementById("mail");
const listError = document.getElementById("listError");

// CREDIT CARD

const ccNum = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");


// JOB ROLE ON CHANGE
title.addEventListener("change", (e) => {

    const value = e.target.value;
    if (value === "other") {
        otherTitle.style.display = "block";
    } else {
        otherTitle.style.display = "none";
    }

})

// SHIRT ON CHANGE
design.addEventListener("change", (e) => {
    

    const value = e.target.value;

    if (value === "") {
        color.innerHTML = '<option value="">Please select a T-shirt theme</option>';
    } else if (value === "js puns") {
        color.innerHTML = `
		<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
		<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
		<option value="gold">Gold (JS Puns shirt only)</option> 
		`;

    } else if (value === "heart js") {
        color.innerHTML = `
		<option value="tomato">Tomato (I &#9829; JS shirt only)</option>
		<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
		<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> 
		`;
    }


})


for (var i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener("change", (e) => {

        runningTotal = 0;
        for (let i = 0; i < inputs.length; i++) {

            for (let x = 0; x < inputs.length; x++) {

                let chosenTime = inputs[i].getAttribute("data-day-and-time");
                let thisTime = inputs[x].getAttribute("data-day-and-time");

                if (chosenTime == thisTime &&
                    inputs[i].name != inputs[x].name) {

                    inputs[x].disabled = inputs[i].checked;
                }
            }

            if (inputs[i].checked) {
                runningTotal += +inputs[i].getAttribute("data-cost");
            }

        }
        total.textContent = runningTotal;
    })
}


// PAYMENT ON CHNGE
payment.addEventListener("change", (e) => {


    for (var i = 0; i < methods.length; i++) {
        methods[i].style.display = "none";
    }
    if (e.target.value != "") {
        methods[e.target.value].style.display = "block";
    }

});



//FORM

form.addEventListener("submit", (e) => {
	

	// CHECK NAME
	if (name.value == "") {
		name.className = "error";
		e.preventDefault();
	} else {
		name.className = "";
	}

	// CHECK EMAIL
	if ( checkEmail() ) {
		mail.className = "";
	}else {
		mail.className = "error";
		e.preventDefault();
	}

	// CHECK CHECKBOXES
	if ( checkCheckBoxes() ) {
		listError.style.display = "none";
	}
	else {
		listError.style.display = "block";
		e.preventDefault();
	}

	// CHECK CREDIT CARD

	if ( payment.value == "credit-card" && checkCard() ) {
		console.log("CC Good")
	} else if ( payment.value == "credit-card" && !checkCard() ) {
		e.preventDefault();
	}


})

// ON CHNAGE CHECK

form.addEventListener("keydown", (e) => {

	if (e.target.id == "name" && name.value == "") {
		name.className = "error";
	} else if (e.target.id == "name" && name.value){
		name.className = "";
	} else if (e.target.id == "mail" && checkEmail() ) {
		mail.className = "";
	} else if (e.target.id == "mail" && !checkEmail() ) {
		mail.className = "error";
	}

})



function checkEmail() {
	return /[^@]+@[^@]+\.[a-z]+$/i.test(mail.value);
}

function checkCheckBoxes() {
	let a = false;

	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].checked) {
			a = true;
		}
	}

	return a;
}


function checkCard() {
	let check = false;

	const ccNumCheck = /^(\d{13,15})$/.test(ccNum.value);
	const zipCheck = /^(\d{5})$/.test(zip.value);
	const cvvCheck = /^(\d{3})$/.test(cvv.value);

	if (ccNumCheck == false) {
		ccNum.className = "error";
	}else {
		ccNum.className = "";
	}

	if (zipCheck == false) {
		zip.className = "error";
	}else {
		zip.className = "";
	}

	if (cvvCheck == false) {
		cvv.className = "error";
	}else {
		cvv.className = "";
	}

	if ( !ccNumCheck || !cvvCheck || !zipCheck) {
		return false;
	} else {
		return true;
	}



}






