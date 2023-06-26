import React from 'react';
import { motion } from "framer-motion";
import { helloArray } from './helloArray';

const randomHello = () => {
    const randomIndex = Math.floor(Math.random() * helloArray.length)
    console.log(randomIndex)
    return helloArray[randomIndex]
}

const animationProps = (delay) => {
    return {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: {duration: 2, delay: delay}
    }
}

function GameButtons({ user, handleGameButton, loadingButton }) {

    const hello = randomHello();

    return (
        <div>
            <div className='gap-0 overflow-clip '>
                <motion.div
                    {...animationProps(0)}
                    className='text-[500%] mb-0 font-verziert text-transparent bg-clip-text 
                    bg-gradient-to-b from-black to-transparent'>
                    {hello.hello.toUpperCase()},
                </motion.div>

                <motion.div {...animationProps(0.2)} className='text-[12px] text-right'>({hello.language})</motion.div></div>
            <div className='h-full w-full font-normal gap-8 overflow-hidden text-lightblue'>
            
            
            
                <motion.div {...animationProps(0.4)} className='text-5xl'>{user?.username}</motion.div>
            
            <div className=''>
                <motion.div {...animationProps(3)}>your current elo is...</motion.div>
                <motion.div {...animationProps(3.2)} className='text-5xl'>{user?.elo}</motion.div>
            </div>

            <motion.div
                {...animationProps(3.5)}
                className='cursor-pointer bg-verydarkblue font-verziert text-5xl shadow-xl rounded-sm p-8'
                whileTap={{ scale: 0.8 }}
                onClick={()=>handleGameButton()}
            >PLAY</motion.div>

        </div>
        </div>
        
    );
}

export default GameButtons;