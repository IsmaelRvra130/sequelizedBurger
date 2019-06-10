var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
// var burger = require('../models/burger.js');
var db = require("../models")

// Create the routes and associated logic
router.get("/", function(req, res){
  res.redirect("/burgers");
})

router.get("/burgers", function(req, res){
  db.burgers.findAll().then(function(burgersData){
    console.log(burgersData);
    res.render("index", { burger_data: burgersData});
  });
});

router.post("/burgers/create", function(req, res){
  db.burgers.create({
    burger_name: req.body.burger_name
  }).then(function(result){
    console.log(result);
    res.redirect("/");
  });
});


// Work on devour it button.
//AssertionError: Missing where attribute in the options parameter.

router.put("/burgers/:id", function(req,res){
  db.burgers.update({
   devoured: true
  }, {
    where: {
      defaultValue: true
    }
  }).then(function(result){
    console.log(result);
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;