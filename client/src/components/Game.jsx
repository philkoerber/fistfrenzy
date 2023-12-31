import React, { useEffect, useState } from 'react';
import { motion} from 'framer-motion';


import useFistStore from './fistStore';
import Hand from './GameComponents/Hand';
import Countdown from './GameComponents/Countdown';
import OpponentInfo from './GameComponents/OpponentInfo';
import CurrentTurn from './GameComponents/CurrentTurn';
import Score from './GameComponents/Score';


const handButtonStyles = "bg-lightblue w-20 h-20 cursor-pointer rounded-full flex justify-center items-center"
const handButtonAnimation = (isSelected) => {
    return {
        whileTap: isSelected? {scale: 1.2} : {scale: 0.8},
        animate: isSelected ? { scale: 1.5 } : { scale: 1 },
        transition: {duration: 0.1}
    }
    
}


function Game() {
    

    const { gameState, phase, hands, winner, playerNumber, socket } = useFistStore();
    const [selectedButtonIndex, setSelectedButtonIndex] = useState()
    const [selectedMoves, setSelectedMoves] = useState({ player: 0, opp: 0 })

    


    useEffect(() => {
        const player = playerNumber === 0 ? "player1" : "player2"
        const opponent = playerNumber === 0 ? "player2":"player1"
        setSelectedMoves({player: hands[player], opponent: hands[opponent]})
    }, [hands])

    useEffect(() => {
        setSelectedButtonIndex(null);
        if (phase === "countdown") {
            //countdown stuff
        }
        if (phase === "showdown") {
            //showdown stuff
        }
    },[phase])
    
    const handleClick = (index) => {
        if(phase==="countdown"){
        if(index!=null){
        setSelectedButtonIndex(index)
        let move = ""
        if (index === 0) { move = "rock" }
        if (index === 1) { move = "paper" }
        if(index===2){move="scissors"}
        socket.emit("playerMove", move)}}
    }

    return (
        <motion.div
            className='w-full max-w-[1200px] h-full mx-auto relative flex justify-center items-center gap-4 overflow-hidden font-normal'>
            <div className='w-full h-full flex justify-center absolute z-10'>
                <motion.div
                className='absolute -bottom-[10%]'
                animate={selectedMoves.player ? {
                    y: "-25vh",
                    scale: 1,
                } :
                    {
                        x: 0,
                        scale: 0.8
                    }}>
                <Hand selectedMove={selectedMoves.player} />
            </motion.div>
            </div>

            <div className='w-full h-full flex justify-center absolute rotate-180 z-10'>
                <motion.div
                className='absolute -bottom-[10%] z-10'
                animate={selectedMoves.opponent ? {
                    y: "-25vh",
                    scale: 1,
                } :
                    {
                        x: 0,
                        scale: 0.5
                    }}>
                <Hand selectedMove={selectedMoves.opponent} />
            </motion.div>
            </div>

            <div className='absolute top-0 z-20'>
                <OpponentInfo/>
            </div>
            
            <div className='z-30'><Countdown phase={phase} /></div>
            <div><CurrentTurn currentTurnNumber={gameState?.currentTurn} /></div>

            <div className='absolute w-full right-0 left-0'><Score/></div>
            
            <div className='flex gap-6 absolute bottom-6 z-20'>
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
            
        </motion.div>
    );
}

export default Game;