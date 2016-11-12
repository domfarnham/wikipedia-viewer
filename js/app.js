// Create get request function 
// Create funtion that takes user's input and turns it into a http request
// Add listener to input
// Add event handler to submit button

// Global variables
// arr is used to store the converted JSON
var arr = [];
// panel type allows you to change the color of the results panels
// I need to fix a bug related to CSS first though
var panelType = "primary";

// Functions
// getRequest function
function getRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function processRequest(e) {
		
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log("getRequest status code : " + xhr.status);	
			var response = JSON.parse(xhr.responseText);
			// console.log("response is : " + JSON.stringify(response));
			callback(response);
		}
	}
	xhr.open('GET', url, true);
	// xhr.withCredentials = true;
	xhr.setRequestHeader("Content-Type", "application/json");
	// xhr.setRequestHeader('Authorization', 'Basic '); // Can use btoa('myUsrName:myPwd')
	xhr.send();
}

// Wikipedia search function
var searchWiki = function() {
	console.log("search called");
	var input = document.getElementById("input").value;
	var request = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + input + "&origin=*";
	getRequest(request, processResults)
};

// function to process the search results
var processResults = function(data) {
	document.getElementById("results").innerHTML = "";
	console.log("processResults called");
	convertToArray(data.query.pages);
	// console.log(data.query.pages[arr[0]]);
	for (var i = 0; i < arr.length; i++) {
		var div = document.createElement("div");
		div.className = "row";
		var resultsHtml = "";
		resultsHtml += "<div class='col-lg-6 col-md-6 col-sm-12'><div class='panel panel-" + panelType + "'>";
		resultsHtml += "<a href='https://en.wikipedia.org/?curid=" + data.query.pages[arr[i]].pageid + "'>";
		resultsHtml += "<div class='panel-heading'><h3 class='panel-title' id='title'>" + data.query.pages[arr[i]].title + "</h3></div>";
		resultsHtml += "<div class='panel-body' id='extract'>" + data.query.pages[arr[i]].extract + "</div>";
		resultsHtml += "</a></div></div>";
		resultsHtml += "</div>";
		i++;
		resultsHtml += "<div class='col-lg-6 col-md-6 col-sm-12'><div class='panel panel-" + panelType + "'>";
		resultsHtml += "<a href='https://en.wikipedia.org/?curid=" + data.query.pages[arr[i]].pageid + "'>";
		resultsHtml += "<div class='panel-heading'><h3 class='panel-title' id='title'>" + data.query.pages[arr[i]].title + "</h3></div>";
		resultsHtml += "<div class='panel-body' id='extract'>" + data.query.pages[arr[i]].extract + "</div>";
		resultsHtml += "</a></div></div>";
		resultsHtml += "</div>";
		div.innerHTML = resultsHtml;
		document.getElementById("results").appendChild(div);
	}
	arr = [];
};

// Fuction that converts the JSON to an array
var convertToArray = function(obj) {
	console.log("convertToArray called");
	for (key in obj) {
		arr.push(key);
	}
	// console.log("arr is : " + arr);
};

// Function that clears results and seach text
var clearResults = function() {
	console.log("clearResults called")
	document.getElementById("results").innerHTML = "";
	document.getElementById("input").value = "";
};

// Add event listener to search button
document.getElementById("search").addEventListener("click", searchWiki);

// Add event listeners to input box
	// clear results 
document.getElementById("input").addEventListener("focus", clearResults);
	// Submit search when return is pressed
document.getElementById("input").addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode == 13) {
		document.getElementById("search").click();
	}
});