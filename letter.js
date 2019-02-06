// Letter constructor
function Letter(characterVal) {
	this.characterVal = characterVal;
	this.guessed = false;
}

Letter.prototype.displayLetter = function () {
	if (this.guessed) {
        // returns the underlying character if the letter has been guessed
		return this.characterVal;
	} else {
        // returns a placeholder (like an underscore) if the letter has not been guessed
		return " _ ";
	}
};

// takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
Letter.prototype.letterChecker = function (letter) {
	if (this.characterVal === letter) {
		this.guessed = true;
	}
};

module.exports = Letter;
