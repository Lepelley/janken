const moves = ['rock', 'paper', 'scissors'];
let secondesBetweenNextMove = 2;
let movesToWin = 3;

// reference
const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissors = document.getElementById('computer-scissors');
const playerRock = document.getElementById('player-rock');
const playerPaper = document.getElementById('player-paper');
const playerScissors = document.getElementById('player-scissors');

/**
 * Render scoreboard for player and computer
 * @returns {void}
 */
const buildMovesToWin = () => {
  const playerScoreBoard = document.getElementById('player-score');
  playerScoreBoard.innerHTML = '';
  for (let i = 0 ; i < movesToWin ; i++) {
    const liElt = document.createElement('li');
    liElt.textContent = '❌';
    playerScoreBoard.appendChild(liElt);
  }

  const computerScoreBoard = document.getElementById('computer-score');
  computerScoreBoard.innerHTML = '';
  for (let i = 0 ; i < movesToWin ; i++) {
    const liElt = document.createElement('li');
    liElt.textContent = '❌';
    computerScoreBoard.appendChild(liElt);
  }
}

/**
 * Random move
 * @returns {string} - a valid move from the moves array
 */
const computerPlay = () => {
  const random = Math.floor(Math.random()* moves.length);
  return moves[random];
}

/**
 * Prevent user from playing
 * @returns {void}
 */
const blockMoves = () => {
  playerRock.setAttribute('disabled', '');
  playerPaper.setAttribute('disabled', '');
  playerScissors.setAttribute('disabled', '');
}

/**
 * Allow user to play
 * @returns {void}
 */
const unlockMoves = () => {
  playerRock.removeAttribute('disabled', '');
  playerPaper.removeAttribute('disabled', '');
  playerScissors.removeAttribute('disabled', '');
}

/**
 * Render computer move
 * @param {string} move 
 * @return {void}
 */
const computerMoveRender = (move) => {
  if (move === 'rock') {
    computerRock.classList.add('choice');
    setTimeout(() => {
      computerRock.classList.remove('choice');
    }, secondesBetweenNextMove*1000);
  }
  else if (move === 'paper') {
    computerPaper.classList.add('choice');
    setTimeout(() => {
      computerPaper.classList.remove('choice');
    }, secondesBetweenNextMove*1000);
  }
  else if (move === 'scissors') {
    computerScissors.classList.add('choice');
    setTimeout(() => {
      computerScissors.classList.remove('choice');
    }, secondesBetweenNextMove*1000);
  }
  else {
    console.error('Error : Invalid move');
  }
};

/**
 * Play a round of game
 * @param {string} playerSelection 
 * @param {string} computerSelection 
 * @returns {number} - 0 = player won the move, 1 = IA won the move, -1 = draw
 */
const playRound = (playerSelection, computerSelection) => {
  computerMoveRender(computerSelection);

  if (playerSelection === computerSelection) { // draw
    writeAction('Draw !');
    return -1;
  }
  else {
    const p = playerSelection; 
    const c = computerSelection;
    const win = `You win that move, ${p} beats ${c}`;
    const lose = `You lose that move, ${c} beats ${p}`;
    if (p === 'rock') {
      if (c === 'paper') {
        writeAction(lose);
        return 0;
      }
      else if (c === 'scissors') {
        writeAction(win);
        return 1;
      }
    }
    else if (p === 'paper') {
      if (c === 'rock') {
        writeAction(win);
        return 1;
      }
      else if (c === 'scissors') {
        writeAction(lose);
        return 0;
      }
    }
    else if (p === 'scissors') {
      if (c === 'paper') {
        writeAction(win);
        return 1;
      }
      else if (c === 'rock') {
        writeAction(lose);
        return 0;
      }
    }
  }
}

/**
 * Render result of the last move
 * @param {number} point - return of the function playRound()
 * @returns {void}
 */
const score = (point) => {
  const playerScore = document.querySelectorAll('#player-score li');
  const computerScore = document.querySelectorAll('#computer-score li');
  if (point === 1) { // player won last move
    // we add one point
    for (let i = 0 ; i < playerScore.length ; i++) {
      if (playerScore[i].innerHTML === '❌') {
        playerScore[i].innerHTML = '✓';
        return;
      }
    };
  }
  else if (point === 0) { // computer won last move
    // we add one point
    for (let i = 0 ; i < computerScore.length ; i++) {
      if (computerScore[i].innerHTML === '❌') {
        computerScore[i].innerHTML = '✓';
        return;
      }
    };
  }
};

/**
 * Reset the game (score, unlock moves and html)
 */
const reset = () => {
  const playerScore = document.querySelectorAll('#player-score li');
  const computerScore = document.querySelectorAll('#computer-score li');
  playerScore.forEach(element => {
    element.innerHTML = '❌';
  });
  computerScore.forEach(element => {
    element.innerHTML = '❌';
  });
  writeAction('');
  unlockMoves();
}

/**
 * Check is the game is finish
 * @returns {number} - 0 = not finish, 1 = player won, 2 = IA won
 */
const checkEndGame = () => {
  const playerScore = document.querySelectorAll('#player-score li');
  const computerScore = document.querySelectorAll('#computer-score li');
  let i = 0;
  while (i < playerScore.length && playerScore[i].innerHTML !== '❌') {
    i++;
  }
  if (i === playerScore.length) { // if player won
    return 1;
  }

  i = 0;
  while (i < computerScore.length && computerScore[i].innerHTML !== '❌') {
    i++;
  }
  if (i === computerScore.length) { // if computer won
    return 2;
  }

  // else, no one won for now
  return 0;
}

/**
 * Change the content of div#action
 * @param {string} action
 * @returns {void}
 */
const writeAction = (action) => {
  if (action === '') {
    const actionElt = document.getElementById('action');
    actionElt.innerHTML = 'Play !';
  }
  else {
    const actionElt = document.getElementById('action');
    actionElt.innerHTML = action;
  }
}

/**
 * Play the game
 */
const game = () => {
  // Init
  buildMovesToWin();
  const playerMoves = [ 
    { element: playerRock, name: 'rock' }, 
    { element: playerPaper, name: 'paper' }, 
    { element: playerScissors, name: 'scissors' }
  ];

  // Reset
  const resetElt = document.getElementById('reset');
  resetElt.addEventListener('click', () => {
    reset();
  });

  playerMoves.forEach(move => {
    move.element.addEventListener('click', () => { // player plays
      blockMoves();
      move.element.classList.add('choice');
      score(playRound(move.name, computerPlay())); // test who won or draw
      setTimeout(() => {
        const isEndGame = checkEndGame(); // if someone won
        if (isEndGame === 1) { // player
          writeAction('Result : You win !!');
          blockMoves();
        }
        else if (isEndGame === 2) { // computer
          writeAction('Result : You lose.');
          blockMoves();
        }
        else { // no end game
          writeAction('');
          unlockMoves();
        }
        move.element.classList.remove('choice');
      }, secondesBetweenNextMove*1000);
    });
  });

  const configMoves = document.getElementById('moveToWin');
  configMoves.addEventListener('change', (e) => {
    reset();
    if (e.target.value < 1) {
      movesToWin = 1;
      e.target.value = 1;
    }
    else {
      movesToWin = e.target.value;
    }
    buildMovesToWin();
  });

  const configSecondesPerMove = document.getElementById('secondesBetWeenMove');
  configSecondesPerMove.addEventListener('change', (e) => {
    secondesBetweenNextMove = e.target.value;
  });
}

game(); // start !
