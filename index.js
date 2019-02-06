console.log("Welcome to Command-Line Hangman! The theme is: Cities");

// ask player if they'd like to play, on confirmation begin game
function initialPrompt() {
    var Word = require("./word.js");
    var inquirer = require("inquirer");

    inquirer.prompt([{
        type: "confirm",
        name: "confirmation",
        message: "Ready to play?"
    }]).then(function (answers) {

        // var runGame;

        if (answers.confirmation) {
            var allTheWords = ["Chicago", "Prague", "Paris", "Amsterdam", "Orlando", "Singapore", "Bangkok"];

            // Randomly selects a word and uses the Word constructor to store it
            var runGame = function () {
                var randomNum = Math.floor(Math.random() * (allTheWords.length - 1));
                var theWord = allTheWords[randomNum];
                var wordConst = new Word(theWord);
                var chances = 10;
                var alphabet = "qwertyuiopasdfghjklzxcvbnm";
                var alphabetArr = alphabet.split("");

                // Prompts the user for each guess and keeps track of the user's remaining guesses
                function nextPrompt() {
                    if (wordConst.underscores() !== theWord && chances > 0) {
                        inquirer.prompt([{
                            type: "input",
                            name: "inputVal",
                            message: "Guess a letter!"
                        }]).then(function (answers) {

                            var flag = false;
                            for (var i = 0; i < alphabetArr.length; i++) {
                                var element = alphabetArr[i];
                                if (element === answers.inputVal) {
                                    alphabetArr.splice(i, 1);
                                    flag = true;
                                }
                            }
                            if (flag) {
                                displayWord(answers.inputVal);
                                correctResponse(answers.inputVal);
                                nextPrompt();
                            } else {
                                console.log("Please choose a different letter.");
                                displayWord(answers.inputVal);
                                nextPrompt();
                            }

                        });
                    } else if (wordConst.underscores() !== theWord && chances === 0) {
                        gameOverCheck(chances);
                    } else {

                        if ((allTheWords.length - 1) > 0) {
                            console.log("You guessed the word! Onto the next one");
                            allTheWords.splice(randomNum, 1);
                            runGame();
                        } else {

                            inquirer.prompt([{
                                type: "confirm",
                                name: "playAgain",
                                message: "Congrats! That's all the words. You are so worldly! \n Play again?"
                            }]).then(function (answers) {
                                if (answers.playAgain) {
                                    initialPrompt();
                                } else {
                                    console.log("Come back later!");
                                }
                            });
                        }

                    }
                }

                // calls Word method guess and underscores on the guessed letter to reveal if player guessed correctly
                function displayWord(letter) {
                    wordConst.guess(letter);
                    console.log(wordConst.underscores());
                }

                // returns a response to the player based on if guess was right or wrong, also decrements chances if wrong
                function correctResponse(letter) {
                    var flag = false;
                    for (var i = 0; i < wordConst.word.length; i++) {
                        var element = wordConst.word[i].characterVal;
                        if (letter === element || letter.toUpperCase() === element) {
                            flag = true;
                        }
                    }
                    if (flag) {
                        console.log("Correct!");
                    } else {
                        console.log("Incorrect!");
                        chances--;
                        console.log("You have " + chances + " chances left!");
                    }
                }

                //checks a players chances each turn and returns a game over message if chances = 0
                function gameOverCheck(chanceVar) {
                    if (chanceVar === 0) {
                        inquirer.prompt([{
                            type: "confirm",
                            name: "playAgain",
                            message: "GAME OVER! Play again?"
                        }]).then(function (answers) {
                            if (answers.playAgain) {
                                console.log(wordConst);
                                initialPrompt();
                            } else {
                                console.log("Come back later!");
                            }
                        });
                    }
                }

                displayWord("");
                nextPrompt();

            };

            runGame();

        } else {
            console.log("Come back later!");
        }

    });
}

initialPrompt();
