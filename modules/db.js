const mongoose = require('mongoose');
let ret = {
	mongoose,
	db: {}
}
mongoose.connect("mongodb://127.0.0.1:27017/urlSmaller", { useMongoClient: true });
mongoose.connection.on("open", () => {
	console.log("mongo connected");
	ret.db = mongoose.connection;
});
mongoose.connection.on("error", err => {
	throw new Error(err);
});

const crypto = require('crypto');

let urlSchema = mongoose.Schema({
	url: String,
	smallURL: String,
	createdDate: Number
});
urlSchema.methods.createSmallURL = function (smallURL, callback) {
	if (smallURL) {
		ret.db.collections.urls.findOne({ smallURL }, (err, col) => {
			if (err) { console.error(new Error(err)); return; }
			if (col) { callback(true); return; }
			this.smallURL = smallURL;
			this.createdDate = +new Date();
			callback();
		});
	} else {
		let hash = crypto.randomBytes(5).toString("hex");
		ret.db.collections.urls.findOne({ smallURL: hash }, (err, col) => {
			if (err) { console.error(new Error(err)); return; }
			if (col) { this.createSmallURL(callback); return; }
			this.smallURL = hash;
			this.createdDate = +new Date();
			callback();
		});
	}


};
ret.urlModel = mongoose.model("URL", urlSchema);

module.exports = ret;