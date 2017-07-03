let express = require('express');
let router = express.Router();
const base = require('../modules/db.js');

router.use("/:id", function (req, res) {
    base.db.collections.urls.findOne({ smallURL: req.baseUrl.slice(1) }, function (err, responseDB) {
        if (err) {
            console.error(new Error(err));
            return;
        }
        if (responseDB) {
            res.redirect(responseDB.url);
        } else {
            res.end("url not found");
        }
    })
})
module.exports = router;