import React, { useEffect, useState } from 'react';
import useFistStore from '../fistStore';
import { motion, AnimatePresence } from 'framer-motion';

function Score() {
    const { gameState, playerNumber } = useFistStore()

    const animationProps = {
        initial: { y: 90, opacity: 0},
        animate: { y: 0, opacity: 1},
        exit: {y: -90, opacity: 0}
    }

    const [displayOpponentScore, setDisplayOpponentScore] = useState(0)
    const [displayPlayerScore, setDisplayPlayerScore] = useState(0)

    useEffect(() => {
        if (gameState?.currentTurn > 0) {
            const opp = playerNumber ? gameState?.player2Score : gameState?.player1Score
        const player = playerNumber ? gameState?.player1Score : gameState?.player2Score

        setTimeout(() => {
        setDisplayOpponentScore(opp);
        setDisplayPlayerScore(player)
        },600)
        }
        
    },[gameState])

    return (
        <AnimatePresence>
            <div className='flex flex-col text-right gap-4 text-[20vh] font-verziert font-bold '>
                <motion.div
                key={"opponent" + displayOpponentScore}
                {...animationProps}
                className='z-10 text-transparent bg-clip-text bg-gradient-to-b from-verydarkblue to-black'>
                {displayOpponentScore}
            </motion.div>

                <motion.div
                    key={"player"+displayPlayerScore}
                    {...animationProps}
                    className='z-10 text-transparent bg-clip-text bg-gradient-to-b from-verydarkblue to-black'>
                {displayPlayerScore}
            </motion.div>
                
            <div className='absolute right-[-16vh] top-1/2 transform translate-y-[-50%] -rotate-90'>
                <div className='text-transparent bg-clip-text bg-gradient-to-b font-thin from-verydarkblue to-transparent'>SCORE</div>
            </div>
            
        </div>
        </AnimatePresence>
        
    );
}

export default Score;