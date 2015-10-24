var express = require('express');
var app = express();
var formidable = require("formidable");
var util = require('util');

var user = {
	name: "Peyman",
	skills: ["Pitch Man", "Cleaner"]
}

app.post('/', function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
			//Store the data from the fields in your data store.
			//The data store could be a file or database or any other store based
			//on your application.
			res.writeHead(200, {
					'content-type': 'text/plain'
			});
			res.write('received the data:\n\n');
			res.end(util.inspect({
					fields: fields,
					files: files
			}));
	});
});

// serve out of public folder
app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
