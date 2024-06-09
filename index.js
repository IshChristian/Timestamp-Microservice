// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Helper function to format date
const formatDate = (date) => {
  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
};

// // http://expressjs.com/en/starter/basic-routing.html
app.get("/api/", function (req, res) {
  const currentDate = new Date();
  res.json(formatDate(currentDate));
});


// // your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date;

  let date;
  // Check if dateParam is a number
  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  // Validate the date
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json(formatDate(date));
  }
});


app.get('/api/whoami',(req,res) =>{
  let yourIP = req.ip;
  let yourLanguage = req.header("accept-language");
  let yourSoftware = req.header("user-agent");
  res.json({ipaddress : yourIP, language : yourLanguage, software : yourSoftware});
});


app.get('/api/', (req, res) => {
  const ipaddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  //  Logging for debugging
  console.log('IP Address:', ipaddress);
  console.log('Language:', language);
  console.log('Software:', software);

  res.json({
    ipaddress,
    language,
    software
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
