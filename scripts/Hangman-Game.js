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