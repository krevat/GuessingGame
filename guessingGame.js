/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber = generateWinningNumber();
var playersGuesses = [];
var hint = true;
var won = false;

/*var GGame = function(){
	var ggame = {
		playersGuess: undefined,
		winningNumber: generateWinningNumber(),
		playersGuesses: [],
		hint: true,
		won: false
	};
	return ggame;
}*/




/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	playersGuess = $('#userInput').val();
	if (!$.isNumeric(playersGuess)){
		$('p').text("Please input a valid number");
	}
	else {
		playersGuess = +$('#userInput').val();
		//console.log("PlayersGuess is "+ playersGuess);
		if (playersGuess > 0 && playersGuess <= 100){
			checkGuess();
		}
		else {
			$('p').text("Please input a valid number");
		}
	}
	$('#userInput').val("");
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(g, w){
	// add code here
	var outputMessage = "";
	if (g < w){
		outputMessage += "Your guess of " + g + " is lower than";
	}
	else {
		outputMessage += "Your guess of " + g + " is higher than";
	}
	if (Math.abs(g - w) <= 5){
		outputMessage += " and within 5 digits of";
	}
	else if (Math.abs(g - w) <= 10){
		outputMessage += " and within 10 digits of";
	}
	outputMessage += " the winning number."
	return outputMessage;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if (playersGuess === winningNumber){
		if ($('p').hasClass("wrong")) {
			$('p').removeClass(("wrong"));
		}
		$('p').addClass("right");
		$('p').text("You won!");
		$('#youWon').show();
		hint = false;
		won = true;
	}
	else if (won){
		$('p').text("Please start a new game before guessing again.");
	}
	// if the array is empty, add the new value
	/*else if (playersGuesses.length === 0){
		playersGuesses.push(playersGuess);
		$('p').css('color', 'red');
		$('p').text("Try again!");
	}*/
	// the value is already in the array
	else if (playersGuesses.indexOf(playersGuess) !== -1){
		$('p').addClass("wrong");
		$('p').text("You've already guessed " + playersGuess + " Try again!");
	}
	// else the value is a new incorrect guess
	else {
		playersGuesses.push(playersGuess);
		$('p').addClass("wrong");
		if (playersGuesses.length >= 5){
			$('p').text("Game over! Better luck next time!");
			$('#youLost').show();
		}
		else {
			$('p').html("<p>" + lowerOrHigher(playersGuess, winningNumber) + " Try again!<br />You have " + (5-playersGuesses.length) + " guesses remaining.</p>");
			hint = true;
		}
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	if (playersGuesses.length === 0){
		$('p').text("Hmm... why don't you try guessing something first.");
	} else if (playersGuesses.length < 5 && hint) {
		var suggestions = [];
		suggestions.push(winningNumber);
		for (var i = 0; i < (5-playersGuesses.length)*2-1; i++){
			suggestions.push(generateWinningNumber());
		}
		$('p').html("<p>One of these numbers is the winning number: <br /><b>" + suggestions.sort().join(', ') + "</b><br />You have " + (5 - playersGuesses.length) + " guesses remaining.</p>");
		hint = false;
	} else if (playersGuesses.length < 5 && !hint && (winningNumber != playersGuess)) {
		var t = $('p').text();
		$('p').text(t + " Please guess something else before getting a new hint!");
	} else {
		$('p').text("Please start a new game.");
	}

}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	playersGuesses = [];
	hint = true;
	won = false;
	winningNumber = generateWinningNumber();
	playersGuess = undefined;
	$('img').hide();
	if ($('p').hasClass("right")){
		$('p').removeClass("right");
	}
	if ($('p').hasClass("wrong")){
		$('p').removeClass("wrong");
	}
	$('p').text("Guess a number to start playing!");
}


/* **** Event Listeners/Handlers ****  */
$('document').ready(function(){
	//generateWinningNumber();
	$('#submit').on('click', playersGuessSubmission);
	// unnecessary code b/c i used an html form
	/*$('#userInput').on('keypress', function(e) {
    		if(e.which == 13) {
        		playersGuessSubmission;
    		}
		});*/
	$('#extra .btn:last()').on('click', provideHint );
	$('#extra .btn:first()').on('click', playAgain );



});
