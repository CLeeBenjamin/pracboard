import React, { useState } from 'react';
import './index.css';


function Mainboard() {
  const board = [];
  const [catPos, setCatPos] = useState([3,3]) // [x,y]

  const handleClick = (i, j) => {
    console.log(`Square (${i}, ${j}) was clicked.`);
  };

  const handleKeyDown = (event) => {
    setCatPos(prevPos => {
      let newPos = [...prevPos]; // create a copy of the previous position
      switch (event.key) {
        case 'ArrowUp':
          newPos[0] = Math.max(newPos[0] - 1, 0);
          break;
        case 'ArrowRight':
          newPos[1] = Math.min(newPos[1] + 1, 6);
          break;
        case 'ArrowDown':
          newPos[0] = Math.min(newPos[0] + 1, 6);
          break;
        case 'ArrowLeft':
          newPos[1] = Math.max(newPos[1] - 1, 0);
          break;
        default:
          break;
      }
      return newPos;
    });
  };
  

  for (let i = 0; i < 7; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const squareKey = `${i}-${j}`;
      const squareClass = `square ${(i + j) % 2 === 0 ? "light" : "dark"}`;
      const isTopRight = i === 6 && j === 0;
      const isBottomLeft = i === 0 && j === 6;
      const center = i === catPos[1] && j === catPos[0]
      const waterBowl = isTopRight ? <div className="water-bowl" onKeyDown={handleKeyDown} /> : null;
      const scratchPad = isBottomLeft ? <div className="scratch-pad" /> : null;
      const cat = center ? <div className="cat" />  : null;
     
      row.push(
        <div
          key={squareKey}
          className={squareClass}
          onClick={() => handleClick(i, j)}>
          {waterBowl}
          {scratchPad}
          {cat}

        </div>
      );
      
    }
    board.push(<div key={i} className="row">{row}</div>);
  }

  return (
    <div className="board" onKeyDown={handleKeyDown} tabIndex="0">
      {board}
    </div>
  );
}



export default Mainboard;