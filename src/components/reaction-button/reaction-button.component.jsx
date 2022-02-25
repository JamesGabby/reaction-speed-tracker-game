import * as React from 'react';
import { ColourContext } from '../../context/ColourContext';
import { GameOverTextContext } from '../../context/GameOverTextContext';
import GameOver from '../../pages/game-over/game-over';

var clickedTime, changeTime, reactionTime, total, average;
var reactionTimeArray = [];
var clicks = [];
var count = [];

var hasStarted = false;
var gameOver = false;

function ReactionButton() {
  const {colour, setColour} = React.useContext(ColourContext);
  const {setMessage} = React.useContext(GameOverTextContext);

  function changeColour() {
    var time = Math.random() * 5000;

    setTimeout(function() {
      if (colour === 'bg-red-600') {
        setColour('bg-green-600')
      } else {
        setColour('bg-red-600')
      }
      clicks.shift()
      changeTime = Date.now();
      
    }, time); 
  }
  
  return (
    <div className="App">
      <h1 className="text-2xl font-bold my-20 font-mono">Insurance Revolution Task</h1>
      <div>
        <button className="inline-flex justify-center py-2 px-4 p-5 mt-5 border border-transparent shadow-2xl text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            hasStarted = true;
            gameOver = false;
            changeColour();
            reactionTimeArray = reactionTimeArray.filter((prev) => prev === '');
            count = count.filter((prev) => prev === 'Z');
            average = 0;
        }}>
          {gameOver ? 'Play Again' : 'Click to begin'}
        </button>
      </div>
  
      <div>
        {(gameOver === true && hasStarted === false) 
          ? 
            <GameOver /> 
          : 
            <button className={`inline-flex justify-center p-20 mt-10 border border-transparent shadow-2xl text-sm font-medium rounded-md text-white ${colour} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={!hasStarted}
              onClick={function() {
                clicks.push({});
                count.push({});
                clickedTime = Date.now();
                reactionTime = (clickedTime - changeTime) / 1000;    
                reactionTimeArray.push({
                  reactionTime: reactionTime,
                  id: count.length
                });  
                total = reactionTimeArray.reduce((accumulator, currentElement) => accumulator + currentElement.reactionTime, 0);
                average = (total / reactionTimeArray.length).toFixed(3);
                changeColour();
                if (reactionTimeArray.length === 5) {
                  gameOver = true;
                  hasStarted = false;
                } else if (clicks.length > 1) {
                  average = 'Disqualified';
                  setMessage('You clicked too early, please try again.');
                  gameOver = true;
                  hasStarted = false;
                } else {
                  setMessage('');
                }
              }}
            >
              {hasStarted ? <p style={{color: 'white'}}>Press Me!</p> : <div>Wait for the colour to change and click!<div />You have 5 attempts.</div>}
            </button>}
      </div>
      <h2 className="text-3xl font-bold my-5">{gameOver ? `Final Score: ${average}` : ''}</h2>
      <h3 className="text-2xl font-bold">{gameOver ? reactionTimeArray.map((rt) => (
        <div key={rt.id}>
         Attempt {rt.id}: {rt.reactionTime} seconds
        </div>
        )) : ''}
      </h3>
    </div>
  );
}

export default ReactionButton;
