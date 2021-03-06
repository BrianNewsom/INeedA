var express = require('express');
var app = express();
var http = require("http").Server(app);
var formidable = require("formidable");
var util = require('util');
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var twil = require('./twil.js');
var favicon = require('serve-favicon');

// set favicon
app.use(favicon(__dirname + '/public/favicon.ico'));


var request = require('request');

var user = {
	name: "Dawson Botsford",
	phone: "(970) 412-0347",
	address: "3355 S Las Vegas Blvd",
	city: "Las Vegas, NV 89109"
}

// Socket io junk
var GLOBAL_SOCKET = null;

io.on('connection', function(socket){
	console.log('received connection on socket, setting global socket');
	GLOBAL_SOCKET = socket;

	socket.on('finished_job', function(data) {
		console.log("Received finished job message")
		console.log(data)
		var blob = JSON.parse(data)

		var url = 'https://api.venmo.com/v1/payments?phone=15712634240&amount=' + blob.total_cost + '&note=' + encodeURIComponent("For " + blob.job) + '&access_token=' + process.env['VENMO_TOKEN']
		console.log(url)

		request.post(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
				//Send twilio message
				twil.sendText('Your job has been completed! Your account has been charged $' + blob.total_cost + '. Visit https://ineedaapp.herokuapp.com/star.html?id=14520aspdosa9 to review Peyman Mortazavi.');
				console.log("sent text message to customer.")
		  }
			else {
				console.log("API failed, error:")
				console.error(error)
				console.log("status code: " + response.statusCode)
			}
		})
	})
})


app.get('/venmo/callback', function(req, res){
	console.log("Received Venmo callback /venmo/callback");
	console.log(req.body);
})

app.post('/', function(req, res){

	console.log("Received POST request to /");

	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
			//Store the data from the fields in your data store.
			//The data store could be a file or database or any other store based
			//on your application.
			stringifiedFields = JSON.stringify(fields)
			console.log(stringifiedFields);

			if (GLOBAL_SOCKET !== null && fields.job_tag && fields.pay_rate) {
				console.log("Emitting data to mobile via socket");

				var obj = {
					job_tag : fields.job_tag,
					pay_rate : fields.pay_rate,
					name : user.name,
					phone : user.phone,
					address : user.address,
					city : user.city
				}
				console.log(obj);

				GLOBAL_SOCKET.emit('request_pool', obj);

				// Handle job finishing
			} else{
				console.log("Could not post, global socket does not exist");
			}
			res.end(stringifiedFields);
	});
});

// serve out of public folder
app.use(express.static('public'));

var server = http.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
