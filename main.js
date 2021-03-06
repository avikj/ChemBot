var login = require("facebook-chat-api");
var wolfram = require('wolfram');
var pt = require("periodic-table");
var fs = require("fs");
var secretData = JSON.parse(fs.readFileSync(__dirname+"/secretData.json"));
console.log(secretData);
var wolframClient = wolfram.createClient(secretData.WOLFRAM_API_KEY);

var elementData = pt.all();

login({email: secretData.FACEBOOK_EMAIL, password: secretData.FACEBOOK_PASSWORD}, function callback (err, api) {
    if(err) return console.error(err); 
 
    api.listen(function callback(err, message) {
    	// help message
    	if(message.body.trim() == "help"){
    		api.sendMessage("Available commands:\n\t<element symbol> - finds the element with that symbol and returns relevant information"
    			+"\n\tmm <compound> - returns the molar mass of a compound. Requires proper capitalization."
    			+"\n\tbalance <equation> - returns a balanced form of a chemical equation. Requires proper capitalization."
    			+"\n\thelp - displays this message.", message.threadID);
    		return;
    	}

    	// balance chemical equations
    	if(message.body.startsWith("balance")){
    		api.sendMessage("Attempting to "+message.body+"...", message.threadID);
			wolframClient.query(message.body, function(err, result) {
				if(err) throw err;
				try{
					api.sendMessage(result[1].subpods[0].value, message.threadID);
				}catch(e){
					api.sendMessage("Could not "+message.body, message.threadID);
				}
			});
			return;
    	}

    	// find molar mass
    	if(message.body.startsWith("mm")){
    		api.sendMessage("Computing molar mass of "+message.body.substring(2)+"... ", message.threadID);
    		wolframClient.query("molar mass "+message.body.substring(2), function(err, result) {
				if(err) throw err;
				try{
					api.sendMessage("The molar mass of "+message.body.substring(2)+" is "+result[1].subpods[0].value+".", message.threadID);
				}catch(e){
					api.sendMessage("There was an error computing the molar mass. Make sure that you use proper capitalization.", message.threadID);
				}
			});
			return;
    	}

    	// find element by symbol
    	if(message.body.trim().toUpperCase()=="FL")
    		message.body = "uuq";
    	for(var i = 0; i < elementData.length; i++){
			if(elementData[i].symbol.toUpperCase()==message.body.trim().toUpperCase()){
				if(elementData[i].symbol.toUpperCase()=="UUQ"){
					api.sendMessage({
						// body: "Ununquadium (Uuq) has been renamed to Flevorium (Fl).",
						attachment: fs.createReadStream(getImagePath(elementData[i]))
					}, message.threadID);
					console.log("Found element "+message.body);
					return;
				}
				api.sendMessage({
					// body: format(elementData[i]),
					attachment: fs.createReadStream(getImagePath(elementData[i]))
				}, message.threadID);
				console.log("Found element "+message.body);
				return;
			}
		}
    	api.sendMessage("Element "+message.body+" not found.", message.threadID);
    });
});

function format(element){
	return element.symbol+" is the symbol for "+(element.name.startsWith("Aluminum") ? "Aluminum" : element.name)
	+". Its atomic number is "+element.atomicNumber
	+" and its atomic mass is "+element.atomicMass+" amu.";

}

function getImagePath(element){
	return __dirname+'/images/'+element.atomicNumber+"-"+element.name+"-Tile.png";
}
