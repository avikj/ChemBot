var login = require("facebook-chat-api");
var wolfram = require('wolfram').createClient("WOLFRAM_API_KEY");
var pt = require("periodic-table");
var fs = require("fs");
var elementData = pt.all();
login({email: "loquaciousmeow@gmail.com", password: "veryweakpassword123"}, function callback (err, api) {
    if(err) return console.error(err);
 
    api.listen(function callback(err, message) {
    	if(message.body.startsWith("balance")){
			wolfram.query(message.body, function(err, result) {
				try{
					api.sendMessage(result[1].subpods[0].value, message.threadID);
				}catch(e){
					api.sendMessage("Could not "+message.body, message.threadID);
				}
			});
			return;
    	}
    	var done = false;
    	for(var i = 0; i < elementData.length; i++){
			if(elementData[i].symbol.toUpperCase()==message.body.toUpperCase()){
				api.sendMessage({
					body: format(elementData[i]),
				}, message.threadID);
				console.log("Found element "+message.body);
				return;
			}
		}
    	api.sendMessage("Element "+message.body+" not found.", message.threadID);
    });
});

function format(element){
	return element.symbol+" is the symbol for "+element.name
	+". Its atomic number is "+element.atomicNumber
	+" and its atomic mass is "+element.atomicMass+" amu.";

}

