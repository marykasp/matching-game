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
  { name: "airedale", image: "./img/dogs/AIREDALE-TERRIER.svg" },
  { name: "australian", image: "./img/dogs/AUSTRALIAN.svg" },
  { name: "basenji", image: "./img/dogs/BASENJI.svg" },
  { name: "belgian shepherd", image: "./img/dogs/BELGIAN-SHEPHERD.svg" },
  { name: "border collie", image: "./img/dogs/BORDER-COLLIE.svg" },
  { name: "bull dog", image: "./img/dogs/BULL-DOG.svg" },
  { name: "chinese sharpei", image: "./img/dogs/CHINESE-SHARPEI.svg" },
  { name: "chow chow", image: "./img/dogs/CHOW-CHOW.svg" },
  { name: "cocker spaniel", image: "./img/dogs/COCKER-SPANIEL.svg" },
  { name: "dalmation", image: "./img/dogs/DALMATION.svg" },
  { name: "english setter", image: "./img/dogs/ENGLISH-SETTER.svg" },
  { name: "irish setter", image: "./img/dogs/IRISH-SETTER.svg" },
  { name: "pharoah hound", image: "./img/dogs/PHAROAH-HOUND.svg" },
  { name: "saluki", image: "./img/dogs/SALUKI.svg" },
  { name: "shetland sheepdog", image: "./img/dogs/SHETLAND-SHEEPDOG.svg" },
  { name: "shiba ini", image: "./img/dogs/SHIBA-INU.svg" },
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

  timeValue.innerHTML = `<span>Time:</span> <span id="time">${minutesValue}:${secondsValue}</span>`;
}

function movesCounter() {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span> <span id="count">${movesCount}</span>`;
}

function stopGame() {
  controlsContainer.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
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
  console.log(cardValues);
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
      if (!card.classList.contains("matched")) {
        // flip the card
        card.classList.add("flipped");
        // firstCard is iniatlized as false
        if (!firstCard) {
          // current card will become first card
          firstCard = card;
          // first card value will be equal to the currentcard value (name)
          firstCardValue = card.getAttribute("data-card-value");
          console.log(firstCardValue);
        } else {
          // incremenent moves
          movesCounter();
          secondCard = card;
          secondCardValue = card.getAttribute("data-card-value");
          console.log(firstCardValue, secondCardValue);
          // if there is a match
          if (secondCardValue === firstCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            // reset firstCard to false
            firstCard = false;
            // increment winCount
            winCount += 1;
            // if wincount is equal to the length of the card list then show that the user has won in the results element
            if (winCount == Math.floor(cardValues.length / 2)) {
              console.log("testing");
              results.innerHTML = `
              <h2><i class="fa-solid fa-dog"></i>You won!</h2>
              <h4>Moves: <span>${movesCount}</span></h4>
              <button id="start">Play Again</button>
              `;
              controlsContainer.classList.remove("hide");
            }
          } else {
            // if the cards do not match - flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 960);
            delay;
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

// START GAME
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controlsContainer.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  // start timer
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

// STOP GAME
stopButton.addEventListener("click", stopGame);
