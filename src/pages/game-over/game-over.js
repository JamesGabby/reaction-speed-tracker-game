import React from "react";
import { GameOverTextContext } from '../../context/GameOverTextContext';

const GameOver = () => {
    const {message} = React.useContext(GameOverTextContext);

    return (
        <div>
            <h1 className="text-2xl font-bold my-5">{message}</h1>
        </div>
    )
}

export default GameOver;