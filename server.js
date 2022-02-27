// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/", (req, res) => {
  res.json({
    unix: Date.now(),
    utc: Date(),
  });
});

app.get("/api/:date?", (req, res) => {
  let unix_timestamp = parseInt(req.params.date);
  var date = new Date(parseInt(req.params.date));
  var regexp = /\d+(?:-\d+)+/g;
  if (req.params.date.match(regexp) != null) {
    var DashDate = req.params.date;
    res.json({
      unix: new Date(DashDate).getTime(),
      utc: new Date(DashDate).toUTCString(),
    });
  } else if (date.getTime() > 0) {
    res.json({
      unix: unix_timestamp,
      utc: new Date(unix_timestamp).toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 5000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
