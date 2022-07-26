const moves = document.querySelector("#moves-count");
const timeValue = document.querySelector("#timer");
const results = document.querySelector("#results");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const gameContainer = document.querySelector(".game-container");
const controlsContainer = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;
let firstCardValue;
let secondCardValue;

// Items array
const items = [
  { name: "anaconda", image: "./img/anaconda.png" },
  { name: "bee", image: "./img/bee.png" },
  { name: "chameleon", image: "./img/chameleon.png" },
  { name: "cockatoo", image: "./img/cockatoo.png" },
  { name: "crocodile", image: "./img/crocodile.png" },
  { name: "gorilla", image: "./img/gorilla.png" },
  { name: "macaw", image: "./img/macaw.png" },
  { name: "monkey", image: "./img/monkey.png" },
  { name: "piranha", image: "./img/piranha.png" },
  { name: "sloth", image: "./img/sloth.png" },
  { name: "tiger", image: "./img/tiger.png" },
  { name: "toucan", image: "./img/toucan.png" },
];

// Initial Time
let seconds = 0;
let minutes = 0;

let movesCount = 0;
let winCount = 0;

function timeGenerator() {
  seconds += 1;
  if (seconds >= 60) {
    minute += 1;
    seconds = 0;
  }

  // format time to display
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;

  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
}

function movesCounter() {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
}

// Pick random objects from items array
function generateRandom(size = 4) {
  let tempArray = [...items];

  // array to hold card values
  let cardValues = [];
  // (4 * 4) / 2 - since pairs of objects exist
  size = (size * size) / 2;

  // iterate over and pick random card
  for (let i = 0; i < size; i++) {
    let randomIndex = Math.floor(Math.random() * tempArray.length);
    // push card to cardValues array

    cardValues.push(tempArray[randomIndex]);
    // remove the card object from the temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
}

function generateMatrix(cardValues, size = 4) {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  // shuffle the cards
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /* create cards
      front: shows a question mark
      back: shows the image
      data-card-value: used to keep track of the cards
    */
    gameContainer.innerHTML += `
   <div class="card-container" data-card-value=${cardValues[i].name}>
    <div class="card-before">?</div>
    <div class="card-after">
      <img src=${cardValues[i].image} class="image" alt=${cardValues[i].name}/>
    </div>
   </div>
   `;
  }

  // Grid generator
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

  // Cards
  let cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // if card is already matched will be ignored
      // if card is not yet matched then..
      if (!cards.classList.contains("matched")) {
        // flip the card
        card.classList.add("flipped");
        // firstCard is iniatlized as false
        if (!firstCard) {
          // current card will become first card
          firstCard = card;
          // first card value will be equal to the currentcard value (name)
          firstCardValue = card.getAttribute("data-card-value");
        }
      } else {
        // incremenent moves
        movesCounter();
        secondCard = card;
        secondCardValue = card.getAttribute("data-card-value");
        console.log(firstCardValue, secondCardValue);
        if (secondCardValue === firstCardValue) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          // reset firstCard to false
          firstCard = false;
          // increment winCount
          winCount += 1;
          if (winCount == Math.floor(cardValues.length / 1)) {
            result.innerHTML = `<h2>You won!</h2><h4>Moves: ${movesCount}</h4>`;
          }
        }
      }
    });
  });
}

// initialize game and function calls
function initializer() {
  // clear the results
  results.innerText = "";
  // reset score
  winCount = 0;
  // generate random cards
  let cardValues = generateRandom();
  console.log(cardValues);
  generateMatrix(cardValues);
}

initializer();
