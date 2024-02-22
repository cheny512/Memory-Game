const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "LightSkyBlue",
  "LawnGreen",
  "orange",
  "purple",
  "fuchsia",
  "pink",
  "cyan",
  "red",
  "LightSkyBlue",
  "LawnGreen",
  "orange",
  "purple",
  "fuchsia",
  "pink",
  "cyan"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card

function createDivsForColors(colorArray) {
  
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
  
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    
   
  }
}
let flippedCards = [];

// TODO: Implement this function!
let attempts = 0
let counter = 0
function handleCardClick(event) {
  
  if (event.target.tagName === 'DIV' && flippedCards.length < 2) {
    // Get the real color from the class attribute
    let realColor = event.target.classList[0];
    
    // Flip the card only if it is not already flipped
    if (!flippedCards.includes(event.target)) {
      event.target.style.backgroundColor = realColor;
      flippedCards.push(event.target);
      
      
      // If two cards are flipped, check if they need to be reset or remain open
      if (flippedCards.length === 2) {
        attempts++;
        document.getElementById('attempts').innerText = 'Attempts: ' + attempts;
        if (flippedCards[0].className === flippedCards[1].className) {
          // Cards match, keep them open
          
          flippedCards[0].removeEventListener("click", handleCardClick);
          flippedCards[1].removeEventListener("click", handleCardClick);
          counter = counter +2;
          if (counter === 16){
            winGame();
            clearInterval(Interval);
            
          }
          flippedCards = [];
        } else {
          
          // Cards do not match, flip them back after a delay
          setTimeout(resetColors, 500);
        }
      }
    }
  }
}
function resetColors() {
  // Reset the background color of the two flipped cards
  for (let card of flippedCards) {
    card.style.backgroundColor = ''; // Reset to original color
  }
  // Clear the flipped cards array
  flippedCards = [];
}
let seconds = 30
//starts the timer
function timerBegin() {
  Interval=setInterval(timeMinus, 1000)
  
}
timerBegin();
//updates timer and clears it
function timeMinus(){
  seconds--;
  document.getElementById('timer').innerText = 'Time Left: ' + seconds + 's';
  if(seconds<= 0){
    
    document.getElementById('gameOver').style.display = 'block';
    clearInterval(Interval)
    stop()

  }
}
function stop(){
  document.getElementById('game').classList.add('blur');
  
}

function start(){
  document.getElementById('game').classList.remove('blur');
}
function restartGame() {
  
  document.getElementById('win').innerHTML = 'Game Over!'
  seconds = 30;
  attempts = 0;
  counter = 0;
  document.getElementById('attempts').innerText = 'Attempts: 0';
  document.getElementById('game').style.filter = '';
  document.getElementById('gameOver').style.display = 'none';
  timerBegin();
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.lastChild);
  }
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  start();

  
}
function winGame() {
  document.getElementById('win').innerHTML = 'You Win!'
  document.getElementById('gameOver').style.display = 'block';
  lowest(attempts)
  stop()

}
let low = localStorage.getItem('lowestScore');

function lowest(attempts) {
  if (low === null || attempts < low) {
    low = attempts;
    localStorage.setItem('lowestScore', low);
  }
  document.getElementById('lowest').innerText = 'Lowest Score: ' + low;
}


// Add event listener to the restart button
document.getElementById('restartButton').addEventListener('click', restartGame);

// when the DOM loads
createDivsForColors(shuffledColors);
