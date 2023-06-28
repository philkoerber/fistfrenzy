import React, { useEffect } from 'react';
import useFistStore from '../fistStore';

function Score() {
    const {gameState, playerNumber } = useFistStore()

    useEffect(()=>{console.log(playerNumber)},[gameState])
    return (
        <div className='flex flex-col text-right gap-4 text-[20vh] font-verziert font-bold '>
            <div
                className='text-transparent bg-clip-text bg-gradient-to-b from-verydarkblue to-black'>
                {playerNumber ? gameState?.player2Score : gameState?.player1Score}
            </div>

            <div className='text-transparent bg-clip-text bg-gradient-to-b from-verydarkblue to-black'>
                {playerNumber ? gameState?.player1Score : gameState?.player2Score}
            </div>
        </div>
    );
}

export default Score;