import { useEffect, useState } from "react";
import "./App.css";
import Board from "./Board.tsx"


function App() {

  type Square = {
    id: string;
    clicked: boolean;
    text: string;
  };

  const tempSquares: Square[] = Array.from({ length: 9 }, (_, i) => ({
    id: i.toString(),
    clicked: false,
    text: "",
  }));

  const [squares, setSquares] = useState<Square[]>(tempSquares);
  const [squaresContent, setSquaresContent] = useState<string[]>()
  const [checked, setChecked] = useState<boolean>(false);
  const [gameMode, setGamemode] = useState<"" | "bot" | "human">("")
  const [difficulty, setDifficulty] = useState<"" | "easy" | "medium" | "hard" | "impossible">("")
  
  console.log("Gamemode ", gameMode)
  console.log("Difficulty ", difficulty)
  function resetSquares() {
    setSquares(tempSquares);
    setChecked(false);
  }

  function handleClick(event: React.MouseEvent) {
    const target = event.currentTarget as HTMLDivElement
    const squareId = target.dataset.id;
    const selectedSquare = squares.find((square) => square.id === squareId);

    if (!selectedSquare || selectedSquare.clicked) {
      alert("Nie można kliknąć 2 razy tego samego");
      return;
    }

    const updatedSquares = squares.map((square) =>
      square.id === squareId
        ? { ...square, clicked: true, text: checked ? "X" : "O" }
        : square
    );
    setSquaresContent(updatedSquares.map((element) => element.text))
    console.log(squaresContent)
    setSquares(updatedSquares);
    setChecked(!checked);

    const winner = checkForWinner(updatedSquares);
    if (winner) {
      alert(`Wygrał ${winner.text}`);
      resetSquares()
    }
  }

  

  function checkForWinner(squares: Square[]) {
    const winningPositions = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"],
    ];
    
    for (const [a, b, c] of winningPositions) {
      if (
        squares[+a].text &&
        squares[+a].text === squares[+b].text &&
        squares[+a].text === squares[+c].text
      ) {
        return squares[+a];
      }
    }
    let y = 0;
    for(let i = 0; i<squares.length; i++){
      if(squares[i].clicked){
        y+=1
      }
      else{
        continue
      }
    }
    if(y===9){
      alert("Draw")
      return null
    }
    return null;
  }

  return (
    <div id="App">
      {gameMode !== "" ? 
      (
        <>
          {gameMode === "bot" && difficulty === "" && (
            <>
              <div onClick={() => setDifficulty("easy")}>Easy</div>
              <div onClick={() => setDifficulty("medium")}>Medium</div>
              <div onClick={() => setDifficulty("hard")}>Hard</div>
              <div onClick={() => setDifficulty("impossible")}>Impossible</div>
            </>
          )}
          {((gameMode === "human") || (gameMode === "bot" && difficulty !== "")) && (
            <>
              <Board squares={squares} handleClick={handleClick} />
            </>
          )}
        </>
      ) : 
      (
        <>
          <div onClick={() => setGamemode("bot")}>Bot</div>
          <div onClick={() => setGamemode("human")}>Human</div>
        </>
      )}
    </div>
  );
}

export default App;
