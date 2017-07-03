let ajax = function (url, params = null, type = "POST") {
	return new Promise((resolve, reject)=>{
		let xhr = new XMLHttpRequest();
		xhr.onload = () => { resolve(xhr.response) };
		xhr.onerror = () => { reject(xhr) };
		xhr.open(type, url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(params);
	});
}
let urlElement = document.getElementById("url");
let endedURL = document.getElementById("endedURL");
document.getElementById("sendBTN").addEventListener("click", function () {
	ajax("/min", "fullURL=" + urlElement.value)
		.then(result => {
			if (result.slice(0, 4) === "__ok") {
				console.log(result.slice(4))
				endedURL.innerHTML = "<a href='" + result.slice(4) + "'>link</a>";
			} else {
				alert(result);
			}
		})
		.then(null, xhr => {
			console.log(xhr.status, xhr.statusCode);	
		});
});