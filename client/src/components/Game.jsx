import React, { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';


import useFistStore from './fistStore';
import Hand from './GameComponents/Hand';


const handButtonStyles = "bg-lightblue w-20 h-20 cursor-pointer rounded-full flex justify-center items-center"
const handButtonAnimation = (isSelected) => {
    return {
        whileTap: isSelected? {scale: 1.2} : {scale: 0.8},
        animate: isSelected ? { scale: 1.5 } : { scale: 1 },
        transition: {duration: 0.1}
    }
    
}


function Game() {
    

    const { gameState, hands, winner, playerNumber, socket } = useFistStore();
    const [selectedButtonIndex, setSelectedButtonIndex] = useState()
    const [selectedMoves, setSelectedMoves] = useState({player: 0, opp: 0})

    


    useEffect(() => {
        const player = playerNumber === 0 ? "player1" : "player2"
        const opponent = playerNumber === 0 ? "player2":"player1"
        setSelectedMoves({player: hands[player], opponent: hands[opponent]})
    }, [hands])

    useEffect(()=>{setSelectedButtonIndex(null)},[winner])
    
    const handleClick = (index) => {
        if(index!=null){
        setSelectedButtonIndex(index)
        let move = ""
        if (index === 0) { move = "rock" }
        if (index === 1) { move = "paper" }
        if(index===2){move="scissors"}
        socket.emit("playerMove", move)}
    }

    




    return (
        <div className='w-full relative h-full flex justify-center items-center gap-4'>
            <motion.div className='absolute bottom-0'>
                <Hand selectedMove={selectedMoves.player} />
            </motion.div>
            
            {/* <motion.div className='absolute top-0'>
                <Hand selectedMove={selectedMoves.opponent} />
            </motion.div> */}
            
            <div className='flex gap-6 absolute bottom-6'>
                <motion.div
                    className={handButtonStyles}
                    {...handButtonAnimation(selectedButtonIndex === 0)}
                    onClick={() => handleClick(0)}>ROCK</motion.div>
            
            <motion.div
                    className={handButtonStyles}
                    {...handButtonAnimation(selectedButtonIndex===1)}
                    onClick={() => handleClick(1)}>PAPER</motion.div>
            
            <motion.div
                    className={handButtonStyles}
                    {...handButtonAnimation(selectedButtonIndex===2)}
                    onClick={()=>handleClick(2)}>SCISSORS</motion.div>


            </div>
            
        </div>
    );
}

export default Game;