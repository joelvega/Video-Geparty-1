//player.js
// create namespace objects
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
The player object stores pertinent functions to be accessed by the players.  
In Video Geparty, players have relatively few functions, as most of the game
control is determined by the host.
*/

//this object will be instantiated, so it should follow tradition constructor obj model

/*attributes to be implemented
	-score=0
	-id
	-name
end attributes */

player.score = 0;
player.id = 0;
player.name = "";


player.pullId= function(/*gets google id from api */)  //gets the hangout id of each player possibly not needed
{
	var playerId = gapi.hangout.getParticipantId();
	return(playerId);
};

player.pullName = function(/*gets google name from api*/)
{
       var playerName = gapi.hangout.getParticipantById(this.pullId());
	   var person = playerName.person.displayName;
       return(person);
};
player.buzzIn = function()
{
	buzzOn(this.id);
};
player.getId = function(/* gets player Id */)
{
		return(player.id);
};
player.setId = function(idNumber) /*sets player Id*/
{
	var playerName = gapi.hangout.getParticipantById(this.pullId());
	var playerId = playerName.person.id;
     player.id = playerId;
};

player.getName = function(/* gets player Name */)
{
	return(player.name);
	
};
player.setName = function(playerName)  /*sets player Name */
{
	var playerName = gapi.hangout.getParticipantById(this.pullId());
	var person = playerName.person.displayName;
	player.name = person;
	
};

// player.buzzIn = function(/*buzzer call*/)
// {
	// main.buzzOn();  /*calls buzzOn function from main code*/
//}

//player.respond = function(response)/*Get players string for final jeopardy, store it in sharedstare object*/
//{
		//not critical for first release
//};

// player.getScore = function(/* gets player score*/)
// {
// };

// player.enterWager = function(int amount) /*allows player to enter wager for question */
// {
		//don't implement for first release
// };




