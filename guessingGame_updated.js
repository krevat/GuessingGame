function GGame() {
		this.playersGuess = undefined;
		this.winningNumber = generatewinningNumber();
		this.playersGuesses = [];
		this.hint = true;
		this.won = false;
	}

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generatewinningNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(g){
	// add code here
	g.playersGuess = $('#userInput').val();
	if (!$.isNumeric(g.playersGuess)){
		$('p').text("Please input a valid number");
	}
	else {
		g.playersGuess = +$('#userInput').val();
		//console.log("g.playersGuess is "+ g.playersGuess);
		if (g.playersGuess > 0 && g.playersGuess <= 100){
			checkGuess(g);
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

function checkGuess(g){
	// add code here
	if (g.playersGuess === g.winningNumber){
		if ($('p').hasClass("wrong")) {
			$('p').removeClass(("wrong"));
		}
		$('p').addClass("right");
		$('p').text("You won!");
		$('#youWon').show();
		g.hint = false;
		g.won = true;
	}
	else if (g.won){
		$('p').text("Please start a new game before guessing again.");
	}
	// if the array is empty, add the new value
	/*else if (g.playersGuesses.length === 0){
		g.playersGuesses.push(g.playersGuess);
		$('p').css('color', 'red');
		$('p').text("Try again!");
	}*/
	// the value is already in the array
	else if (g.playersGuesses.indexOf(g.playersGuess) !== -1){
		$('p').addClass("wrong");
		$('p').text("You've already guessed " + g.playersGuess + " Try again!");
	}
	// else the value is a new incorrect guess
	else {
		g.playersGuesses.push(g.playersGuess);
		$('p').addClass("wrong");
		if (g.playersGuesses.length >= 5){
			$('p').text("Game over! Better luck next time!");
			$('#youLost').show();
		}
		else {
			$('p').html("<p>" + lowerOrHigher(g.playersGuess, g.winningNumber) + " Try again!<br />You have " + (5-g.playersGuesses.length) + " guesses remaining.</p>");
			hint = true;
		}
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(g){
	// add code here
	if (g.playersGuesses.length === 0){
		$('p').text("Hmm... why don't you try guessing something first.");
	} else if (g.playersGuesses.length < 5 && g.hint) {
		var suggestions = [];
		suggestions.push(g.winningNumber);
		for (var i = 0; i < (5-g.playersGuesses.length)*2-1; i++){
			suggestions.push(generatewinningNumber());
		}
		$('p').html("<p>One of these numbers is the winning number: <br /><b>" + suggestions.sort().join(', ') + "</b><br />You have " + (5 - g.playersGuesses.length) + " guesses remaining.</p>");
		g.hint = false;
	} else if (g.playersGuesses.length < 5 && !g.hint && (g.winningNumber != g.playersGuess)) {
		var t = $('p').text();
		$('p').text(t + " Please guess something else before getting a new hint!");
	} else {
		$('p').text("Please start a new game.");
	}

}

// Allow the "Player" to Play Again

function playAgain(g){
	// add code here
	g.playersGuesses = [];
	g.hint = true;
	g.won = false;
	g.winningNumber = generatewinningNumber();
	g.playersGuess = undefined;
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
	var ggame = new GGame();

	//generateg.winningNumber();
	$('#submit').on('click', function(){
		playersGuessSubmission(ggame)
	});

	$('#extra .btn:last()').on('click', function(){
		provideHint(ggame) 
	});
	$('#extra .btn:first()').on('click', function(){
		playAgain(ggame) 
	});



});
