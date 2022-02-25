import './App.css';
import * as React from 'react';
import ReactionButton from './components/reaction-button/reaction-button.component';
import { ColourContext } from './context/ColourContext';
import { GameOverTextContext } from './context/GameOverTextContext';

function App() {
  const [colour, setColour] = React.useState('bg-red-600');
  const [message, setMessage] = React.useState('');

  return (
    <div className="App">
      <GameOverTextContext.Provider value={{message, setMessage}}>
        <ColourContext.Provider value={{colour, setColour}}>
          <ReactionButton />
        </ColourContext.Provider>
      </GameOverTextContext.Provider>
    </div>
  );
}

export default App;
