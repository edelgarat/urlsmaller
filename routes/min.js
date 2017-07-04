let express = require('express');
let router = express.Router();
let request = require('request');
let urlCorrector = require('../modules/urlCorrector.js');
const base = require('../modules/db.js');

router.use('/min', function (req, res) {
    //db connection are succesfull yet
    let urlCorrected = urlCorrector(req.body.fullURL);
    let fullURL = urlCorrected.url;
    request.get(fullURL).on('response', function (response) {
        if (response.statusCode === 200) {
            base.db.collections.urls.findOne({ url: fullURL }, function (err, responseDB) {
                if (err) {
                    console.error(new Error(err));
                    return;
                }
                if (!responseDB) {
                    let userURL = new base.urlModel({ url: fullURL });
                    userURL.createSmallURL(req.body.smallURL, function (urlUsingYet) {
                        if (urlUsingYet) {
                            res.end("error: small url already using yet");
                        } else {
                            userURL.save(function (err2) {
                                if (err2) {
                                    console.error(new Error(err2));
                                    return;
                                }
                                res.end("__ok" + userURL.smallURL);
                            });
                        }    
                    });
                } else {
                    res.end("__ok" + responseDB.smallURL);
                }
            })
        } else {
            res.end("url request response status code !== 200");
        }
        response.destroy();
    }).on("error", function (err) {
        res.end("http error or ircorrect url.")
    })
});

module.exports = router;