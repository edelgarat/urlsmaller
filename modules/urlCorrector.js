const URI = require("url");
module.exports = function (url = "") {
	url = URI.parse(url);
	if (url.host === null) { url.host = url.path; }
	if (!url.protocol) { url.protocol = "http:"; }
	//var resURL="";
	//resURL+=url.protocol+"//";
	//resURL+=url.host;
	let protocol = url.protocol;
	let hostname = url.host;
	let path = "";
	if (url.path === url.href) {
		var slashIndex = url.path.indexOf("/");
		if (slashIndex === -1) {
			path = "";
		} else {
			path = url.path.slice(slashIndex);
			hostname = hostname.slice(0, slashIndex);
		}
	} else {
		path = url.path;
	}
	return { protocol, hostname, path, url: protocol + "//" + hostname + path };
} 
