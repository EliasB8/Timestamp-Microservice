// server.js
// where your node app starts

// init project
const express = require('express');
const isValid = require('date-fns/isValid');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({
  optionsSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Responding with the current time
app.get("/api/timestamp", function (req, res) {
  const date = new Date();
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  });
});

// Responding for date string requests
app.get("/api/timestamp/:date_string", function (req, res) {

  // Parsing the routing parameter
  let date = req.params.date_string;

  // Setting a regex to check for unix time and to replace other date separators with -
  const regEx = /\*|-|\+|,|:/g;

  // Check for the regex and reformat the date
  date = date.search(regEx) === -1 ? parseInt(date, 10) : date.replace(regEx, "-");

  // Check if it is a valid date using isValid, a date-fns lib function
  if (isValid(new Date(date))) {
    res.json({
      "unix": new Date(date).getTime(),
      "utc": new Date(date).toUTCString()
    });
  } else {
    res.json({
      "error": "Invalid Date"
    });
  }
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});