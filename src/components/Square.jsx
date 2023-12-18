import React from "react";
import squareStyle from "./Square.module.css";
export const Square = ({ index, value, handleSquareClick, lineThrough }) => {
  return (
    <>
      <button
        className={`${squareStyle.square} ${
          value == "X" ? squareStyle.x : squareStyle.o
        } ${value !== "" && squareStyle.disable}`}
        onClick={handleSquareClick}
      >
        {value}
      </button>
    </>
  );
};
