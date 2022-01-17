var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", function (req, res) {
	// either use provided date or take current time
	let date = req.params.date || Date.now().toString();
	if (date.match(/^\w+$/)) date = parseInt(date);
	date = new Date(date);

	// handle invalid date
	if (isNaN(date.getTime())) {
		return res.json({ error: "Invalid Date" });
	}

	// respond with date
	let unix = date.getTime();
	let utc = date.toUTCString();
	res.json({ unix, utc });
});

var listener = app.listen(process.env.PORT || 8080, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
