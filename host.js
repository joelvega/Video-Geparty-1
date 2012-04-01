//host.js
// create namespace objects
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
The host object stores pertinent functions to be accessed by the host.  
These functions should only be accessed by a player verified by the 
game.isHost() function.
*/

/*attributes to be implemented
	-id
	-name
end attributes */

host.pullID = function(){
	return (gapi.hangout.getParticipantId());
};

host.pullName = function(){
	return (gapi.hangout.getParticipantById( gapi.hangout.getParticipantId() ).person.displayName);
};

host.adjustScore = function(playerId, amount){
	if(gapi.hangout.data.getValue("Player1Id") == playerId){
		var score = parseInt(gapi.hangout.data.getValue("Player1Score"));
		score += amount;
		gapi.hangout.data.setValue("Player1Score", ""+score);
	}
	else if(gapi.hangout.data.getValue("Player2Id") == playerId){
		var score = parseInt(gapi.hangout.data.getValue("Player2Score"));
		score += amount;
		gapi.hangout.data.setValue("Player2Score", ""+score);
	}
	else if(gapi.hangout.data.getValue("Player3Id") == playerId){
		var score = parseInt(gapi.hangout.data.getValue("Player3Score"));
		score += amount;
		gapi.hangout.data.setValue("Player3Score", ""+score);
	}
};

host.questionCorrect = function(){

};

host.questionIncorrect = function(){

};

host.questionUnanswered = function(){

};

host.releaseBuzzers = function(){
	if(game.isHost() && gapi.hangout.data.getValue("AlreadyReleased") == "false" && game.getState() == cnst.ANSWER){
		console.log("Release buzzer");
		gapi.hangout.data.setValue("Buzzer", "true");
		console.log("Starting timer - Lockout in 5 sec");
		gapi.hangout.data.setValue("AlreadyReleased", "true");
		var t = setTimeout("buzzerLockout()",5000); // Lockout after 5 secs
	}
	else{
		console.log("Bad Release - Ignoring");
	}
};

function buzzerLockout(){
	if(gapi.hangout.data.getValue("Buzzer") == "true"){ // If no one has buzzed in
		console.log("Locking out buzzer");
		gapi.hangout.data.setValue("Buzzer", "false");
		gapi.hangout.data.setValue("BuzzedIn","");
		host.showQuestion();
	}
};

host.removePlayer = function(playerId){
//Later Release
};
 
host.selectAnswer = function( cat, q ){
	gapi.hangout.data.setValue("currentCat",""+cat);
	gapi.hangout.data.setValue("currentQ", ""+q);	
	board.removeFromGrid(cat,q);
};

host.showQuestion = function(){
	gapi.hangout.data.setValue("displayQuestion", "1");
	printer.displayQuestion();
	gapi.hangout.data.setValue("BuzzedIn","");
};

host.questionIncorrect = function() {
	gapi.hangout.data.setValue("BuzzedIn","");
};
 
/* functions to be implemented
	-constructor
	-pullId() -- gets google id from api
	-pullName() -- gets google name from api
	-adjustScore( playerId, amount) --adjusts player score by an int value
	-questionCorrect() --credits a player for a correct answer
	-questionIncorrect() --debits a player for incorrect answer
	-questionUnanswered() --fires if no one answers correctly in allotted time ( NOTE: might belong in game object, since it is fired automatically by game )
	-releaseBuzzers()
	-removePlayer(playerId)
	-selectAnswer( answerId )
	-showQuestion( answerId )
end functions */
