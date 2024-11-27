// Word List

const words = [
    { word: "javascript", hint: "A programming language" },
    { word: "browser", hint: "Used to surf the web" },
    { word: "keyboard", hint: "Input device" },
    { word: "developer", hint: "Software creator" },
    { word: "function", hint: "Code block that does something" },
    { word: "Mouse", hint: "Used to navigate the desktop" },
];

// Game function


document.addEventListener("DOMContentLoaded", () => {
    const hintElement = document.getElementById("hint");
    const wordElement = document.getElementById("word");
    const lettersContainer = document.getElementById("letters");
    const hangmanImage = document.getElementById("hangman-img");
    const messageElement = document.getElementById("message");
    const playAgainButton = document.getElementById("play-again");
    const totalWinsElement = document.getElementById("total-wins");
    const totalLossesElement = document.getElementById("total-losses");
    const winStreakElement = document.getElementById("win-streak");

    let selectedWord, displayWord;
    let wins = 0
    let losses = 0
    let winStreak = 0

    // Win streak display

    function updateWinStreakDisplay() {
        const winStreakElement = document.getElementById("win-streak");
        if (winStreakElement) {
            winStreakElement.textContent = `Win Streak: ${winStreak}`;
        }
    }


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
    lettersContainer.innerhtml = "";
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

}

if (selectedWord.includes(letter.toLowerCase())) {
    button.classList.add("correct");

}

    selectedWord.split("").forEach((char, index) => {
        if (char === letter.toLowerCase()) {
            displayWord[index] = letter;
    }

    });
    updateWordDisplay();
    } else {
        button.classList.add("incorrect");
        incorrectGuesses++;
        hangmanState.increment();
        if (incorrectGuesses >= hangmanState.maxGuesses) {
            endgame(false);
        }
});

if (!displayWord.includes("_")) {
    endgame(true);
}


function endgame(won) {
    if (won) {
        wins++;
        winStreak++;
        messageElement.textContent = "Congratulations! You Won!";
    } else {
        losses++;
        winStreak = 0; 
        messageElement.textContent = `You lost!`;
    }

    totalWinsElement.textContent = wins;
    totalLossesElement.textContent = losses;
    winStreakElement.textContent = winStreak;

    lettersContainer.innerHTML = "";
    playAgainButton.classList.remove("hidden");
}

playAgainButton.addEventListener("click", startGame);
startGame();



// Create startgame to start the game

// Win streak tally