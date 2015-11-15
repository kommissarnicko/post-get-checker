/******************************************************************************
** NAME: Nickolas A. Williams 
** DATE: 11/15/2015               
** CLASS: CS 290, Section 400
** PROJECT: GET and POST checker
** FILENAME: post-get.js
******************************************************************************/

//dependencies
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

//activate middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001); //will use 3001 for this

//lets me know it's running
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

//all requests are get requests, so on access w/no info this
//will say "get request received" and have no information
app.get('/', function(req, res) //if get request received
{
	var urlArray = []; //only will be information in the URL
	for (var i in req.query)
	{
		//push each item in turn to array
		urlArray.push({'name':i, 'value':req.query[i]})
	}
	
	var context = {}; //create object to hold array
	context.urlTable = urlArray; //append array to object
	res.render('get', context); //pass object to get page
});

app.post('/', function(req, res) //if post request received
{
	var urlArray = []; //might be information in the URL
	for (var i in req.query) //repeat process for get
	{
		urlArray.push({'name':i, 'value':req.query[i]})
	}
	
	var bodyArray = []; //will be information in the body
	for (var i in req.body)
	{
		//push each item in turn to array
		bodyArray.push({'name':i, 'value':req.body[i]})
	}
	
	var context = {}; //creat object to hold both arrays
	context.urlTable = urlArray; //append arrays to object
	context.bodyTable = bodyArray;
	res.render('post', context); //pass object to post page
});

//errors
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});