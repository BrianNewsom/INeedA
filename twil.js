// Load the twilio module
var twilio = require('twilio');

var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function sendText(msg) {
  console.log('sending text in sendText');
  client.messages.create({
      body: msg,
      to: '+' + process.env.MY_NUMBER,
      from: '+12345644668'
    }, function(err, message) {
      process.stdout.write(message.sid);
  });
}

module.exports.sendText = sendText;
