//Dependencies.
var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();
var bodyParser = require('body-parser')
var db = require("./models");
//Serve static content for the app from "public" directory.
app.use(express.static("public"));

//Parse application body
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Import routes and give the server acess to them.
var routes = require("./controllers/burgers_controller.js");
app.use(routes);
require('./routes/api-routes.js')(app); 
require('./routes/html.routes.js')(app);


//Start our server to listen for client request
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
