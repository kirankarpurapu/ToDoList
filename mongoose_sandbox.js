'use strict';
var mongoose = require("mongoose");

//sandbox is the name of the db
mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err) {
	console.log("mongo db connection error", err);
});

//first time the event occurs
db.once("open", function() {
	console.log("The database connection was succesful");
	//all db communication goes here
	var Schema = mongoose.Schema;
	var animalSchema = new Schema({
		type: String,
		size: String,
		color: String,
		weight: Number,
		name: String
	});

	var Animal = mongoose.model("Animal", animalSchema);
	var elephant = new Animal({
		type: "elephant",
		size: "big",
		color: "white",
		weight: 100,
		name: babboo
	});
	elephant.save(function(err) {
		if(err) {
			console.log("error while saving the elephant");
		}
		else console.log("successfully saved the elephant");
		db.close(function(){
			console.log("db connection closed");
		});
	});
});

