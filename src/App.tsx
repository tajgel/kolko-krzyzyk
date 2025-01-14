import { useState } from 'react'
import './App.css'

function App() {
  type squaresType = {
    id: string,
    clicked: boolean,
    text: string
  }

  const tempSquares = Array.from({ length: 9 }, (_, i) => ({
    id: i.toString(),
    clicked: false,
    text: ""
  }))
  const[squares, setSquares] = useState<Array<squaresType>>(tempSquares)
  const[checked, setChecked] = useState<boolean>(false)

  function handleReset(){
    setSquares(tempSquares)
    setChecked(false)
  }

  function handleClick(event: React.MouseEvent){
    let tempArray = squares.map((element) => {
      if (element.id === event.currentTarget.id) {
        if (element.clicked) {
          alert("Nie można kliknąć 2 razy tego samego");
          return element;
        } else {
          return { ...element, clicked: true, text: checked ? "X" : "O" };
        }
      } else {
        return { ...element };
    }})
    setSquares(tempArray)
    setChecked(!checked)
    let winner = checkForWinner(tempArray)
    if(winner?.text === "O"){
      alert("Wygrał O")
    }
    else if(winner?.text === "X"){
      alert("wygrał X")
    }
    // let lol = tempArray.map((element) => {
    //   if(element.clicked === true){
    //     pierd+=1;
    //   }
    // })
    // if(pierd !== 0){

    // }
  }

  function checkForWinner(currentPositions: Array<squaresType>){
    let positions = currentPositions.map((element) => element.text)
    console.log(positions)
    const winningPositions = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"]
    ]
    for(let i=0; i<winningPositions.length; i++){
      const [a, b, c] = winningPositions[i]
      if(currentPositions[Number(a)].text && currentPositions[Number(a)].text === currentPositions[Number(b)].text && currentPositions[Number(a)].text === currentPositions[Number(c)].text){
        return currentPositions[Number(a)]
      }
    }

  }

  return (
    <div id='App'>
      <button onClick={handleReset}>reset</button>
      <div id='siatka'>
        {squares.map((square) => (
          <div id={square.id} className='square' onClick={handleClick}>{square.text}</div>
        ))}
      </div>  
    </div>
  )
}

export default App
