const gameContainer = document.getElementById("game");
const resetButton = document.querySelector('button');
let clickCount = 0;
const clickedCards = [];
const matchedCards = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
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

//event listener function for when a card is clicked
function handleCardClick(event) {
  const selectedCard = event.target;

  //if card is already flipped, user can't flip same card again
  if (selectedCard.flipped) {
    return;
  }

  //flip the card user selected and show its color
  clickedCards.push(selectedCard);
  selectedCard.style.backgroundColor = selectedCard.className;
  selectedCard.flipped = true;

  //if two cards are selected, user can't flip any more cards until they are either flipped back down or it's a match
  if (clickedCards.length === 2) {
    gameContainer.classList.add('noClick');

    //if the cards don't match, after a second, flip the two selected cards back over
    if (clickedCards[0].className !== clickedCards[1].className) {
      setTimeout(function () {
        while (clickedCards.length) {
          clickedCards[0].style.backgroundColor = 'rgba(0, 0, 0, 0)';
          clickedCards[0].flipped = false;
          clickedCards.shift();
        }
        gameContainer.classList.remove('noClick');
      }, 1000);
    } else { //if they match, leave the cards flipped so they're unclickable and move them to matchedCards array
      matchedCards.push(clickedCards.shift());
      matchedCards.push(clickedCards.shift());

      gameContainer.classList.remove('noClick');
    }

  }
  if (matchedCards.length === COLORS.length) {
    gameContainer.classList.add('noClick');
    const winner = document.createElement('h2');
    winner.innerText = 'Congratulations, you won!';
    document.body.append(winner);
  }
}

//resets the game when user clicks reset button
//removes all of the card divs, recreates a fresh board of shuffled cards
resetButton.addEventListener('click', function () {
  const deck = gameContainer.children;
  while (deck.length) {
    deck[0].remove();
  }
  createDivsForColors(shuffle(COLORS));
  const winnerMessage = document.querySelector('h2');
  if (winnerMessage) winnerMessage.remove();
  const resetting = document.createElement('h3');
  resetting.innerText = 'Resetting...';
  document.body.append(resetting);
  setTimeout(function () {
    const resetMessage = document.querySelector('h3');
    resetMessage.remove();
    gameContainer.classList.remove('noClick');
  }, 1000);

  clickedCards.length = 0;
  matchedCards.length = 0;
});


// when the DOM loads
createDivsForColors(shuffledColors);

/* */