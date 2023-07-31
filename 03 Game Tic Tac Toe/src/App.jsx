/* eslint-disable react/prop-types */
import { useState } from 'react'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];

    if (squares[a] == squares[b] && squares[b] == squares[c]) {
      return squares[a];
    }
  }

  return false;
}


function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}


function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status = winner ? `Pemenang: ${winner}` : `Giliran: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />

        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />

        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />

        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />

        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />

        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />

        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />

        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 == 0;
  const currentSquare = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Pergi ke langkah ke ${move}` : 'Game Start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="board-container">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}