const gameContainer = document.querySelector(".game-container");
const correctWordText = document.querySelector(".correct-word");

// 1. Fixed the Random Index (Removed the + 1)
const theWord = words[Math.floor(Math.random() * words.length)];
console.log(theWord); // For testing

const divWord = document.querySelector(".word-display");

// Display underscores initially
function give_ofWord(){
  divWord.innerHTML = Array.from(theWord).map(letter =>
    `<span class="word-letter">_</span>`
  ).join("");
}

// Disable buttons and check logic
const divLetters = document.querySelector(".alphabet-container");
const hangmanParts = document.querySelectorAll(".hangman-part");
let wrongGuesses = 0;

let guesses = 6; 
const wrongCountSpan = document.querySelector(".wrong-count");
divLetters.addEventListener("click", checkTheLetter);

function checkTheLetter(e) {
  if (e.target.matches("button")) {
    e.target.disabled = true;
    e.target.classList.add("disabled");
    
    const clickedLetter = e.target.innerText.toLowerCase();

    // === IF GUESS IS CORRECT ===
    if (theWord.includes(clickedLetter)) {
      renderButtons(clickedLetter);

      // WIN CHECK: If there are no underscores left, you win!
      if (!divWord.innerText.includes("_")) {
        gameContainer.classList.add("game-won");
      }
    } 
    
    // === IF GUESS IS WRONG ===
    else {
      guesses--;
      wrongGuesses++;
      
      // Update UI (counts and hangman parts)
      wrongCountSpan.innerText = wrongGuesses;
      if (wrongGuesses <= hangmanParts.length) {
        hangmanParts[wrongGuesses - 1].classList.add("revealed");
      }

      // LOSE CHECK: If 6 wrong guesses, you lose!
      if (wrongGuesses === 6) {
        gameContainer.classList.add("game-lost");
        correctWordText.innerText = theWord; // Show the user the correct word
      }
    }
  }
}



// 3. The Fixed Render Function
function renderButtons(e){
  const spans = divWord.querySelectorAll(".word-letter");


  Array.from(theWord).forEach((char, index) => {
    if (char === e) {
      spans[index].innerText = char;
    }
  });
}
const newGameButton = document.querySelector(".new-game-btn")
newGameButton.addEventListener("click", newGame)

function newGame(){
  location.reload()
}


give_ofWord();


//what is left: new game,
//   game over