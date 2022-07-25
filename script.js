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
  console.log(tempArray);
  // array to hold card values
  let cardValues = [];
  // (4 * 4) / 2 - since pairs of objects exist
  size = (size * size) / 2;

  // iterate over and pick random card
  for (let i = 0; i < size; i++) {
    console.log(tempArray.length);
    let randomIndex = Math.floor(Math.random() * tempArray.length);
    // push card to cardValues array
    console.log(randomIndex);
    cardValues.push(tempArray[randomIndex]);
    // remove the card object from the temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
}
