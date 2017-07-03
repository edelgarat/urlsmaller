let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
const base = require('./modules/db.js');

let app = express();
const httpServer = require('http').createServer(app);
httpServer.listen(80, "127.0.0.1", () => { console.log("server started") });

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
    res.render('index');
});

app.post("/min", require("./routes/min.js"));
app.get("/:id", require("./routes/all.js"));

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error');
});
