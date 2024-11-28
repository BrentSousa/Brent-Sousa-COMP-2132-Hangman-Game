document.addEventListener("DOMContentLoaded", () => {
    const hintElement = document.getElementById("hint");
    const wordElement = document.getElementById("word");
    const lettersContainer = document.getElementById("letters");
    const hangmanImage = document.getElementById("hangman-img");
    const messageElement = document.getElementById("message");
    const playAgainButton = document.getElementById("play-again");
    const winsElement = document.getElementById("wins");
    const lossesElement = document.getElementById("losses");
    const streakElement = document.getElementById("streak");

    let selectedWord, displayWord, incorrectGuesses;
    let totalWins = 0;
    let totalLosses = 0;
    let winStreak = 0;

    const hangmanState = {
        maxGuesses: 6,
        currentImage: 0,
        reset() {
            this.currentImage = 0;
            updateHangmanImage();
        },
        increment() {
            this.currentImage++;
            updateHangmanImage();
        },
    };

    function updateHangmanImage() {
        hangmanImage.src = `../hangman-game-images/hangman-${hangmanState.currentImage}.svg`;
    }

    function startGame() {
        const randomIndex = Math.floor(Math.random() * words.length);
        const selected = words[randomIndex];
        selectedWord = selected.word;
        hintElement.textContent = selected.hint;
        displayWord = "_".repeat(selectedWord.length).split("");
        incorrectGuesses = 0;

        updateWordDisplay();
        generateLetterButtons();
        messageElement.textContent = "";
        playAgainButton.classList.add("hidden");
        hangmanState.reset();
    }

    function updateWordDisplay() {
        wordElement.textContent = displayWord.join(" ");
    }

    function generateLetterButtons() {
        lettersContainer.innerHTML = "";
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement("button");
            button.textContent = letter;
            button.addEventListener("click", () => handleGuess(letter, button));
            lettersContainer.appendChild(button);
        }
    }

    function handleGuess(letter, button) {
        button.disabled = true;

        if (selectedWord.includes(letter.toLowerCase())) {
            selectedWord.split("").forEach((char, index) => {
                if (char === letter.toLowerCase()) {
                    displayWord[index] = letter;
                }
            });
            updateWordDisplay();
        } else {
            incorrectGuesses++;
            hangmanState.increment();

            if (incorrectGuesses >= hangmanState.maxGuesses) {
                endGame(false);
            }
        }

        if (!displayWord.includes("_")) {
            endGame(true);
        }
    }

    function endGame(won) {
        if (won) {
            totalWins++;
            winStreak++;
            messageElement.textContent = "Congratulations! You Won!";
            messageElement.classList.add("win");
            messageElement.classList.remove("lose");
        } else {
            totalLosses++;
            winStreak = 0;
            messageElement.textContent = `You Lost! The word was "${selectedWord}"`;
            messageElement.classList.add("lose");
            messageElement.classList.remove("win");
        }

        updateTally();
        lettersContainer.innerHTML = "";
        playAgainButton.classList.remove("hidden");
    }

    function updateTally() {
        winsElement.textContent = `Wins: ${totalWins}`;
        lossesElement.textContent = `Losses: ${totalLosses}`;
        streakElement.textContent = `Win Streak: ${winStreak}`;
    }

    playAgainButton.addEventListener("click", startGame);

    // Initialize the game and tally
    startGame();
    updateTally();
});
