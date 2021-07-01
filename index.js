// pressing play starts the game
// disables button once clicked
// status displays count up to 3

// Once the counter counts up to 3
// the user buttons are enabled and user can select an option (RPS)
// the game records what option is selected
// the computer randomly picks an option (RPS)

// Once the user picks an option
// compares user and comp choices and decides who wins
// displays who wins and updated score
// play button is enabled and game is reset

// DOM Elements
let start = document.getElementById("start");
let status = document.getElementById("status");
let playerMoves = document.getElementsByClassName("playerMove");
let computerMove = document.getElementById("compMove");

// game variable
let interval = 0;
let timer;
let playerScore = 0;
let compScore = 0;

let moves = ["ROCK", "PAPER", "SCISSOR"];

// adding event listener to start that waits for a click on start
start.addEventListener("click", () => {
  // sets start button to be disabled
  //   start.disabled = true;

  // sets status to begin counting
  status.innerText = "Starting in....";

  // call count up function each second
  timer = setInterval(countUp, 1000);
});

function countUp() {
  // increase interval by 1
  interval = interval + 1;

  if (interval <= 3) {
    // set status of interval to count 1...2...3...
    status.innerText = interval;
  } else {
    // changes status to "GO!" indicating that user can now make their move
    status.innerText = "GO!";

    // clears the interval
    clearInterval(timer);

    // reset interval
    interval = 0;

    // enables player move buttons
    for (let move of playerMoves) {
      move.disabled = false;
      move.addEventListener("click", playerTurn);
    }
  }
}

function playerTurn(event) {
  // recording player move
  let playerSelected = event.target.innerText;

  // makes computers move by randomly select rock, paper, scissor
  // selects a random index between 0 and 2 from moves array
  let computerSelected = moves[Math.floor(Math.random() * 3)];

  // displays computer move
  computerMove.disabled = false;
  computerMove.innerText = computerSelected;

  // determine winner using the determineWinner function
  let winner = determineWinner(playerSelected, computerSelected);

  if (winner === "draw") {
    status.innerText = `It's a draw...\nScore: ${playerScore}-${compScore}`;
  }
  // if comp wins
  else if (winner === "computer") {
    compScore += 1;
    status.innerText = `Computer Wins...\nScore: ${playerScore}-${compScore}`;
  }
  // if player wins
  else {
    playerScore += 1;
    status.innerText = `You WIN! \nScore: ${playerScore}-${compScore}`;
  }
}

function determineWinner(player, computer) {
  // move look up table
  let moveMap = {
    ROCK: 0,
    PAPER: 1,
    SCISSOR: 2,
  };

  if (player === computer) {
    return "draw";
  }
  // formula to determine and declare a winner
  else if ((moveMap[computer] - moveMap[player] + 3) % 3 === 1) {
    return "computer";
  } else {
    return "player";
  }
}
