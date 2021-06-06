let min = 15,
  max = 30,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// Ui Element
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);
  //Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct!,YOU WIN 🎉!`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game Over!,you lots.The correct number was ${winningNum} 😊!`
      );
    } else {
      //continue
      setMessage(
        `Guess is not correct , you have ${guessesLeft} guesses left!`,
        "red"
      );
      guessInput.style.borderColor = "red";
      guessInput.value = "";
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, message) {
  guessInput.disabled = true;
  guessInput.style.borderColor = won ? "green" : "red";
  guessInput.style.color = won ? "green" : "red";
  setMessage(message, won ? "green" : "red");

  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
  guessBtn.addEventListener("mousedown", () => {
    window.location.reload();
  });
}

function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getWinningNum() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
