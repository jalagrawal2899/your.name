// Game variables
const words = ["apple", "banana", "cherry", "grape", "orange"];
let selectedWord;
let hiddenWord;
let remainingAttempts;

// Select a random word from the list
function selectWord() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  hiddenWord = "_".repeat(selectedWord.length);
  remainingAttempts = 6;
}

// Update the hidden word with correctly guessed letters
function updateHiddenWord(letter) {
  let newHiddenWord = "";
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      newHiddenWord += letter;
    } else {
      newHiddenWord += hiddenWord[i];
    }
  }
  hiddenWord = newHiddenWord;
}

// Process user's guess
function processGuess() {
  const guessInput = document.getElementById("guessInput");
  const letter = guessInput.value.toLowerCase();

  if (!letter.match(/^[a-z]$/)) {
    showMessage("Please enter a single letter.");
    return;
  }

  if (hiddenWord.includes(letter)) {
    showMessage("You already guessed that letter.");
    guessInput.value = "";
    return;
  }

  let found = false;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      found = true;
      updateHiddenWord(letter);
    }
  }

  if (found) {
    if (hiddenWord === selectedWord) {
      showMessage("Congratulations! You guessed the word correctly.");
      resetGame();
      return;
    }
    showMessage("Good guess! Keep going.");
  } else {
    remainingAttempts--;
    if (remainingAttempts === 0) {
      showMessage(`Game over! The word was "${selectedWord}".`);
      resetGame();
      return;
    }
    showMessage(`Wrong guess! ${remainingAttempts} attempts remaining.`);
  }

  guessInput.value = "";
  updateDisplay();
}

// Display the hidden word and remaining attempts
function updateDisplay() {
  document.getElementById("hiddenWord").textContent = hiddenWord;
  document.getElementById("remainingAttempts").textContent = remainingAttempts;
}

// Display a message to the user
function showMessage(message) {
  document.getElementById("message").textContent = message;
}

// Reset the game
function resetGame() {
  selectedWord = "";
  hiddenWord = "";
  remainingAttempts = 0;
  updateDisplay();
  selectWord();
}

// Event listener for the guess button
document.getElementById("guessButton").addEventListener("click", processGuess);

// Select the initial word and update the display
selectWord();
updateDisplay();
