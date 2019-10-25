const moves = ['rock', 'paper', 'scissors'];
const timeBetweenMove = 3000;
const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissors = document.getElementById('computer-scissors');
const playerRock = document.getElementById('player-rock');
const playerPaper = document.getElementById('player-paper');
const playerScissors = document.getElementById('player-scissors');
const playerScore = document.querySelectorAll('#player-score li');
const computerScore = document.querySelectorAll('#computer-score li');


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
    }, timeBetweenMove);
  }
  else if (move === 'paper') {
    computerPaper.classList.add('choice');
    setTimeout(() => {
      computerPaper.classList.remove('choice');
    }, timeBetweenMove);
  }
  else if (move === 'scissors') {
    computerScissors.classList.add('choice');
    setTimeout(() => {
      computerScissors.classList.remove('choice');
    }, timeBetweenMove);
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

  if (playerSelection === computerSelection) {
    writeAction('Draw !');
    return -1;
  }
  else {
    const p = playerSelection; 
    const c = computerSelection;
    const win = `You win ! ${p} beats ${c}`;
    const lose = `You lose ! ${c} beats ${p}`;
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
  if (point === 1) {
    for (let i = 0 ; i < playerScore.length ; i++) {
      if (playerScore[i].innerHTML === '❌') {
        playerScore[i].innerHTML = '✓';
        return;
      }
    };
  }
  else if (point === 0) {
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
  let isPlayerWin = (playerScore[0].innerHTML === '✓') && (playerScore[1].innerHTML === '✓') && (playerScore[2].innerHTML === '✓');
  let isComputerWin = (computerScore[0].innerHTML === '✓') && (computerScore[1].innerHTML === '✓') && (computerScore[2].innerHTML === '✓');

  if (isPlayerWin) {
    return 1;
  }
  if (isComputerWin) {
    return 2;
  }
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
  // Init gameboard

  const resetElt = document.getElementById('reset');
  resetElt.addEventListener('click', () => {
    reset();
  });

  const playerMoves = [ 
    { element: playerRock, name: 'rock' }, 
    { element: playerPaper, name: 'paper' }, 
    { element: playerScissors, name: 'scissors' }
  ];

  playerMoves.forEach(move => {
    move.element.addEventListener('click', () => {
      blockMoves();
      move.element.classList.add('choice');
      score(playRound(move.name, computerPlay()));
      setTimeout(() => {
        const isEndGame = checkEndGame();
        if (isEndGame === 1) {
          writeAction('Result : You win !!');
          blockMoves();
        }
        else if (isEndGame === 2) {
          writeAction('Result : You lose.');
          blockMoves();
        }
        else { // no end game
          writeAction('');
          unlockMoves();
        }
        move.element.classList.remove('choice');
      }, timeBetweenMove);
    });
  });
}

game();
