'use strict';

const gameBoard = (() => {
  const gameboard = [];
  const container = document.querySelector('#gameBoard');
  const turnText = document.querySelector('#turnMark');
  for (let i = 0; i < 9; i++) {
    gameboard.push('');
    const tile = document.createElement('div');
    tile.classList.add('gameTile');
    tile.setAttribute('data-tile', `${i.toString()}`)
    tile.addEventListener('click', (e) => {
      tile.classList.add('played');
      tile.classList.add(game.turn);
      game.currentPlayer.tilesPlayed.push(+e.target.dataset.tile);
      game.turnsLeft--;
      game.winCheck();
      game.turn === 'X' ? game.turn = 'O' : game.turn = 'X';      
      game.currentPlayer = game.turn === 'X' ? game.player1 : game.player2;
      turnText.innerHTML = game.turn;
    });
    container.appendChild(tile);
  }

  return {gameboard};
})();

const game = (() => {
  let turn = 'X';
  let turnsLeft = 9
  const player1 = player('X');
  const player2 = player('O');
  let currentPlayer = player1;
  const winConditions = [
    [0,1,2], // horizontal
    [3,4,5],
    [6,7,8],
    [0,3,6], // vertical
    [1,4,7],
    [2,5,8],
    [0,4,8], // diagonal
    [2,4,6]
  ]

  function winCheck() {
    const win = winConditions.some(condition => {
      return condition.every(val => this.currentPlayer.tilesPlayed.includes(val));
    });

    if (win) {
      document.querySelectorAll('.gameTile').forEach(tile => tile.classList.add('played'));
      document.querySelector('#turn').classList.add('disabled');
      document.querySelector('#winText').classList.remove('disabled');
      document.querySelector('#winPlayer').innerHTML = this.currentPlayer.mark;      
    } else if (this.turnsLeft === 0) {
      document.querySelector('#turn').classList.add('disabled');
      document.querySelector('#tieText').classList.remove('disabled');
    }
  }

  return {turn, turnsLeft, player1, player2, currentPlayer, winCheck};
})();

function player(mark) {
  const tilesPlayed = [];
  return {mark, tilesPlayed};
}

document.querySelector('#restart')
  .addEventListener('click', () => window.location.reload());