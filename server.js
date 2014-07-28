//things you want executed and available for the server
//setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

//config
app.use(express.static(__dirname + '/app')); //set the app directory
app.use(morgan('combined')); //logs server requests as they're made
app.use(bodyParser());

//connect and define database schema
mongoose.connect('mongodb://localhost/cbm_database');
var db = mongoose.model('Meals', {
	title:String,
	snippet:String,
	description:String,
	preptime:Number,
	cooktime:Number,
	oventemp:Number,
	ingredients:[],
	instructions:[],
	images:[],
	dietary:{dairyfree: Boolean, glutenfree: Boolean, lowcarb: Boolean}
});

app.route('/api/db/')
	.get(function(req,res) { //request, response
		console.log("--- calling get");
		db.find(function(err,meals) { //error if there is one, data that comes back
			if (err) {
				res.send(err);
			}
			res.json(meals);
		});
	})
	.post(function(req,res){
		console.log("--- calling post");
		var m = req.body; //some express thing
		db.create({
			title:m.title,
			snippet:m.snippet,
			description:m.description,
			preptime:m.preptime,
			cooktime:m.cooktime,
			oventemp:m.oventemp,
			ingredients:m.ingredients,
			instructions:m.instructions,
			images:m.images,
			dietary:{
				dairyfree:m.dietary.dairyfree,
				glutenfree:m.dietary.glutenfree,
				lowcarb:m.dietary.lowcarb
			}
		},function(err,newMeal) {
			if (err) {
				res.send(err);
			}
			db.find(function(err, meals) {
				if (err) {
					res.send(err);
				}
			res.json(meals);
			});
		});
	});

app.route('/api/db/:meal_id')
	.delete(function(req,res) {
		console.log("---calling delete");
		db.remove({
			_id : req.params.meal_id
		}, function(err) {
			if (err)
				res.send(err);
			//get and return all the meals
		db.find(function(err,meals) {
			if (err)
				res.send(err);
			res.json(meals);
		});
	});
})
	.put(function(req,res) {
		console.log("---calling put");
		db.findById(req.params.meal_id, function(err,meal) {
			if (err)
				res.send(err);

			var m = req.body;

			meal.title = m.title;
			meal.snippet = m.snippet;
			meal.description = m.description;
			meal.preptime = m.preptime;
			meal.cooktime = m.cooktime;
			meal.oventemp = m.oventemp;
			meal.ingredients = m.ingredients;
			meal.instructions = m.instructions;
			meal.images = m.images;
			meal.dietary = {
				dairyfree:m.dietary.dairyfree,
				glutenfree:m.dietary.glutenfree,
				lowcarb:m.dietary.lowcarb
			};

			meal.save(function(err) {
				if (err)
					res.send(err);

				db.find(function(err,meals){
					if (err) res.send(err);
					res.json(meals);
				});
			});
		});
	});

app.route('*') //catch all
	.get(function(req,res) {
		res.sendfile('./app/index.html');
	});

//listen - start app with node server.js
var port = Number(process.env.PORT || 8000 );
app.listen(port, function() {
	console.log("CBM Listening on " + port);
});
