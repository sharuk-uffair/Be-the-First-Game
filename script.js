'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');
const btnRollEl = document.querySelector('.btn--roll');


let playing;
let score;
let currentScore;
let activePlayer;

const init = function () {
    playing = true;
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0; //reset the currentscore=0
    activePlayer = activePlayer === 0 ? 1 : 0; //switch player
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRollEl.addEventListener('click', function () {
    if (playing) {
        // Generate a random dice roll (1-6)
        let dice = Math.trunc(Math.random() * 6 + 1);
        // display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // check for roll if 1,then switch player,if not add the dice to currentscore
        if (dice !== 1) {
            // Add dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch player
            switchPlayer();
        }
    }
});

btnHoldEl.addEventListener('click', function () {
    if (playing) {
        // 1. add currentscore to the active player score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        // 2. check if the score>=100
        if (score[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            //Finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            //if not switch player
            switchPlayer();
        }
    }
});

btnNewEl.addEventListener('click', init);