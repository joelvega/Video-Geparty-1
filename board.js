//board.js
// think of these as includes
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
The board object is meant to store functions that deal with the question and answer sets
for each game.  It retrieves questions from the server, returns questions from the current
game's question/answer set, and tracks which questions on the grid have already been asked
each round so that the printer object can properly display the grid.
*/

/*attributes to be implemented
	NOTE: board attributes should be stored in shared state object
end attributes */

/* functions to be implemented
	-removeFromGrid( gridNum ) --function updates shared state so that printer object will not show questions already presented
end functions */

//TODO: function needs to be expanded to incorporate database code, also a for loop that runs through and stores each
//question, answer, and category in the shared state according to proper naming convention.  
/*board.setBoard = function() {
	console.log("SETTING UP THE BOARD");
	for(var i = 0; i < 6; i++){
		var newCategory = "Test Cat" + i;
		gapi.hangout.data.setValue("cat"+i, newCategory);
		for(var j = 0; j < 5; j++){
			var newAnswer = "Test Cat" + i + " A" + j;
			var newQuestion = "Test Cat" + i + " Q" + j;
			gapi.hangout.data.setValue( "cat" + i + "_a" + j, newAnswer );
			gapi.hangout.data.setValue( "cat" + i + "_q" + j, newQuestion );
		}
	}	
	
};*/

board.setBoard = function() {
	console.log("CALLING SETBOARD");

	// Get content
	var content = $.ajax({
                url: "https://bvdtechcom.ipage.com/geparty/gameboard.php",
                async: false
            }).responseText;

	//console.log(content);
	
	xmlDoc = $.parseXML(content);

	$(xmlDoc).find("category").each(function()
 	{
		var id = $(this).attr("id");
		console.log("CategoryID: " + id);
		var category = $(this).attr("title");
		console.log("Category: " + category);

		gapi.hangout.data.setValue(id, category);
  	});

	// TODO - switch question-answer , add answer ID

	$(xmlDoc).find("entry").each(function()
 	{
		var answerID = $(this).attr("aID");
		console.log("answerID: " + answerID);
	    var answer = ($(this).find("answer").text());
		console.log("Answer: " + answer);

		gapi.hangout.data.setValue(answerID, answer);

		var questionID = $(this).attr("qID");
		console.log("questionID: " + questionID);
	    var question = ($(this).find("question").text());
		console.log("Question: " + question);

		gapi.hangout.data.setValue(questionID, question);
	});
	
	gapi.hangout.data.setValue("cat0_grid", "11111");
	gapi.hangout.data.setValue("cat1_grid", "11111");
	gapi.hangout.data.setValue("cat2_grid", "11111");
	gapi.hangout.data.setValue("cat3_grid", "11111");
	gapi.hangout.data.setValue("cat4_grid", "11111");
	gapi.hangout.data.setValue("cat5_grid", "11111");
};


board.setUpJQuery = function() {
	for(var i = 0; i < 6; i++){
		for(var j = 0; j < 5; j++){
			var check = "#cat"+i+"_q"+j;
			$(check).click( function(){
				if( game.isHost() ){
					console.log("setUpJQuery: attempting to set state...");
					game.setState( cnst.ANSWER );
					var hold = $(this).attr('id');
					var m = hold[3];
					var n = hold[6];
					host.selectAnswer(m,n);
					console.log("state is now..." + game.getState() );
				}
			});
		}
	} //end board clicks
};

//pulls question from shared state object
//TODO: implement a parameter(s) that represents the question id according to naming conventions in the shared state
board.getQuestion = function() {
	var cat = gapi.hangout.data.getValue("currentCat");
	var q = gapi.hangout.data.getValue("currentQ");
	return (gapi.hangout.data.getValue( "cat"+cat+"_q"+q ));
};
//get answer from shared state
//TODO: implement a parameter(s) that represents the answer id according to naming conventions in the shared state
board.getAnswer = function() {
	var cat = gapi.hangout.data.getValue("currentCat");
	var a = gapi.hangout.data.getValue("currentQ");
	console.log("CurrentCat: " + cat);
	console.log("CurrentA: " + a);
	return (gapi.hangout.data.getValue( "cat"+cat+"_a"+a ));
};
//TODO: implement parameters that rep the cat id according to naming conventions
board.getCategory = function( catNum ) {
	if( catNum < 6 && catNum >= 0 )
		return( gapi.hangout.data.getValue( "cat" + catNum ) );
	else
		console.log("ERROR: Category number out of range.");
};

//updates shared state so that printer object will not show questions already presented
board.removeFromGrid = function(cat,q) {
		// var cat = gapi.hangout.data.getValue("currentCat");
	// var q = gapi.hangout.data.getValue("currentQ");
	var qNum = parseInt(q);
	var gridStr = gapi.hangout.data.getValue( "cat" + cat + "_grid" );
	gridStr = (gridStr.substr(0, qNum) + "0" + gridStr.substr(qNum+1));
	gapi.hangout.data.setValue( "cat"+cat+"_grid", gridStr );
	console.log("hiding cat"+cat+"_q"+q+": cat"+cat+"_grid = "+gridStr);
};