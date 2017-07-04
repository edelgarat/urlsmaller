"use strict";

var ajax = function ajax(url) {
	var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "POST";

	return new ES6Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function () {
			reject(xhr);
		};
		xhr.open(type, url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(params);
	});
};
var urlElement = document.getElementById("url");
var smallurlElement = document.getElementById("smallurl");
var endedURL = document.getElementById("endedURL");
document.getElementById("sendBTN").addEventListener("click", function () {
	ajax("/min", "fullURL=" + urlElement.value+"&smallURL="+smallurlElement.value).then(function (result) {
		if (result.slice(0, 4) === "__ok") {
			var linkHash = result.slice(4);
			endedURL.innerHTML = "<a href='" +linkHash + "'>localhost/" + linkHash+"</a>";
		} else {
			alert(result);
		}
	}).then(null, function (xhr) {
		console.log(xhr.status, xhr.statusCode);
	});
});