// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(8000, console.log("Server running on localhost: 8000"));

app.post('/addWeather', (req, res) => {
  projectData["date"] = req.body.newDate;
  projectData["temp"] = req.body.temp;
  projectData["feelings"] = req.body.feelings;
  res.end();
});

app.get('/getWeather', (req, res) => res.send(projectData));
