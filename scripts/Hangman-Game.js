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
    const lettersContainer = document.getElementById("letters");
    const hangmanImage = document.getElementById("hangman-img");
    const hintElement = document.getElementById("hint");
    const messageElement = document.getElementById("message");
    const playAgainButton = document.getElementById("play-again");
    const wordElement = document.getElementById("word");

    let selectedWord;

});


generateLetterButton();

function generateLetterButton() {
    lettersContainer.innerhtml = "";
    for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter, button));
    lettersContainer.appendChild(button);
    }
}

const hangmanState = {
    maxGuesses: 6,
    currentImage: 0,
    reset() {
        this.currentImage=0
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