import React, { useState } from "react";
import {Chessboard} from "react-chessboard";
import { Chess, Square } from "chess.js";

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [turn, setTurn] = useState("white"); // Śledzenie tury
  const [highlightedSquares, setHighlightedSquares] = useState<{ [key: string]: { backgroundColor: string } }>({});

  const handleMove = (sourceSquare: string, targetSquare: string) => {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({ from: sourceSquare, to: targetSquare });
    console.log(move)
    if (move) {
      setGame(gameCopy);
      alert("Ruch poprawny")
      
      setTurn(gameCopy.turn() === "w" ? "white" : "black");
      return true
    }
    alert("Ruch niepoprawny")
    return false
  };
  const handlePieceDragBegin = (piece: string, square: string) => {
    const possibleMoves = game.moves({ square: square as Square, verbose: true });
    console.log(possibleMoves)
    const newHighlights: { [key: string]: { backgroundColor: string } } = {};
    possibleMoves.forEach((move) => {
      newHighlights[move.to] = { backgroundColor: "rgba(0, 255, 0, 0.5)" }; // Podświetlenie zielonym kolorem
    });

    setHighlightedSquares(newHighlights);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Szachy React</h2>
      <h3>Kolej: {turn === "white" ? "Białe" : "Czarne"}</h3>
      <Chessboard 
        position={game.fen()}
        boardWidth={600}

        onPieceDrop={(sourceSquare, targetSquare) =>
          handleMove(sourceSquare, targetSquare)
        } 
        onPieceDragBegin={handlePieceDragBegin}
        onPieceDragEnd={()=> setHighlightedSquares({})}
        customSquareStyles={highlightedSquares}
      />
    </div>
  );
};

export default ChessGame;
