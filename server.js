var express = require('express');
var app = express();
var http = require("http").Server(app);
var formidable = require("formidable");
var util = require('util');
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var user = {
	name: "Peyman Mortazavi",
	phone: "(571) 263-4240",
	address: "3685 Moorhead Ave",
	city: "Boulder, CO 80305"
}

// Socket io junk
var GLOBAL_SOCKET = null;

io.on('connection', function(socket){
	console.log('received connection on socket, setting global socket');
	GLOBAL_SOCKET = socket;
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

			res.writeHead(200, {
					'content-type': 'text/plain'
			});

			if (GLOBAL_SOCKET !== null){
				console.log("Emitting data to mobile via socket");
				GLOBAL_SOCKET.emit('request_pool', {
					job_tag : fields.job_tag,
					pay_rate : fields.pay_rate,
					name : user.name,
					phone : user.phone,
					address : user.address,
					city : user.city
				});
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
