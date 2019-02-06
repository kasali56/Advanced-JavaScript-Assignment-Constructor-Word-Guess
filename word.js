var Letter = require("./letter");

// Word constructor
function Word(word) {
    // An array of new Letter objects representing the letters of the underlying word
	this.makeArray = function(word) {
		var splitWord = word.split("");
		var wordArr = [];
		for (var i = 0; i < splitWord.length; i++) {
			var element = splitWord[i];
			var wordElement = new Letter(element);
			wordArr.push(wordElement);
		}
		return wordArr;
	};
	this.word = this.makeArray(word);
}

// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
Word.prototype.underscores = function () {
	var underscoreStr = "";
	var thisWord = this.word;
	for (var i = 0; i < thisWord.length; i++) {
		var underscoreVal = thisWord[i].displayLetter();
		underscoreStr += underscoreVal;
	}
	return underscoreStr;
};

// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
Word.prototype.guess = function (char) {
	var thisWord = this.word;
	for (var i = 0; i < thisWord.length; i++) {
		thisWord[i].letterChecker(char);
		thisWord[i].letterChecker(char.toUpperCase());
		thisWord[i].letterChecker(" ");
		thisWord[i].letterChecker("'");
		thisWord[i].letterChecker("-");
	}
};

module.exports = Word;