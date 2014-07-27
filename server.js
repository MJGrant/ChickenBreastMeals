/*
var express = require('express');
var app = express();
var port = process.env.port || 8000;

app.get('/sample', function(req, res) {
	res.send('this is a sample!');
});

app.listen(port);
console.log('Now listening on port ' + port);
*/



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
	cooktemp:Number,
	ingredients:[],
	instructions:[],
	images:[],
	dietary:{dairyfree: Boolean, glutenfree: Boolean, lowcarb: Boolean}
});

app.route('/api/db/')
	.get(function(req,res) { //request, response
		console.log("calling get");
		db.find(function(err,meals) { //error if there is one, data that comes back
			if (err) {
				res.send(err);
			}
			res.json(meals);
		});
	})
	.post(function(req,res){
		console.log("calling post");
		var m = req.body; //some express thing
		db.create({
			title:m.title,
			snippet:m.snippet,
			cooktemp:m.cooktemp,
			ingredients:m.ingredients,
			instructions:m.instructions,
			images:m.images,
			dietary:{dairyfree:m.dairyfree, glutenfree:m.glutenfree, lowcarb:m.lowcarb}
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
		db.remove({
			_id : req.params.meal_id
		}, function(err) {
			if (err) {
				res.send(err);
			}
			//get and return all the meals
		db.find(function(err,meals) {
			if (err) {
				res.send(err);
			}
			res.json(defs);
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
