import React from 'react'
import "./App.css"
type Square = {
  id: string;
  clicked: boolean;
  text: string;
};

type BoardProps = {
  squares: Array<Square>
  handleClick: (event: React.MouseEvent) => void
}

function Board({squares, handleClick} :BoardProps) {
  return (
    <div id="siatka">
          {squares.map((square :Square) => (
            <div
              key={square.id}
              data-id={square.id}
              className="square"
              onClick={handleClick}
            >
              {square.text}
            </div>
          ))}
        </div>
  )
}

export default Board