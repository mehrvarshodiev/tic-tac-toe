import React, { useState } from "react";
import gameStyle from "./Game.module.css";
import { Square } from "./Square";

const winConditions = [
  // Checking of Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Checking of Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Checking of diagonals
  [0, 4, 8],
  [6, 4, 2],
];

export const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [runGame, setRunGame] = useState(false);
  const [xIsNext, setXIsNext] = useState(false);
  const [oIsNext, setOIsNext] = useState(false);

  function handleSquareClick(index) {
    // If square clicked disable current square
    if (squares[index] || checkWinner(squares)) {
      return;
    }

    // Copy squares array to nextSquares
    const nextSquare = squares.slice();
    // Set "X" or "O" to nextSquare array with current index against of xIsNext

    nextSquare[index] = xIsNext && !oIsNext ? "X" : "O";
    // Set nextSquare array to squares to update it
    setSquares(nextSquare);
    // Change xIsNext state to negation for selecting "X" or "O"
    setXIsNext(!xIsNext);
    setOIsNext(!oIsNext);
    console.log(xIsNext);
  }

  function checkWinner(squares) {
    for (let i = 0; i < winConditions.length; i++) {
      const winCondition = winConditions[i];
      const [a, b, c] = winCondition;
      if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = checkWinner(squares);
  let status = "";
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every((square) => square !== "") && !winner) {
    status = "Draw!";
  } else {
    status = `Next player: ${
      xIsNext && !oIsNext ? "X" : !xIsNext && oIsNext ? "O" : ""
    }`;
  }

  function restartGame() {
    setSquares(Array(9).fill(""));
    setRunGame(false);
    setXIsNext(false);
    setOIsNext(false);
  }

  return (
    <>
      <div
        className={`${gameStyle.select_player_box} ${
          runGame && gameStyle.hide
        }`}
      >
        <button
          onClick={() => {
            setXIsNext(!xIsNext);
            setRunGame(true);
          }}
          title="select X"
          className={gameStyle.select_player_btn}
        >
          X
        </button>
        <button
          onClick={() => {
            setOIsNext(!oIsNext);
            setRunGame(true);
          }}
          title="select O"
          className={gameStyle.select_player_btn}
        >
          O
        </button>
      </div>

      <div className={`${gameStyle.game_wrapper} ${runGame && gameStyle.show}`}>
        <p className={gameStyle.status_text}>{status}</p>
        <div className={gameStyle.game_box}>
          {squares.map((square, index) => (
            <Square
              key={index}
              value={square}
              index={index}
              handleSquareClick={() => handleSquareClick(index)}
            />
          ))}
        </div>
        {status !== "Next player: X" &&
          status !== "Next player: O" &&
          status !== "" && (
            <button className={gameStyle.restart_btn} onClick={restartGame}>
              Restart Game
            </button>
          )}
      </div>
    </>
  );
};
