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
        <div className='h-full w-full flex flex-col justify-center items-center gap-8 overflow-hidden'>
            
            <div className='flex flex-col justify-center items-center gap-0'>
                <motion.div {...animationProps(0)} className='text-[12vh] mb-0'>{hello.hello},</motion.div>
                <motion.div {...animationProps(0.2)} className='text-[12px]'>({hello.language})</motion.div></div>
            <motion.div {...animationProps(0.4)} className='text-5xl font-bold'>{user?.username}</motion.div>
            
            <div className='flex flex-col '>
                <motion.div {...animationProps(3)}>your current elo is...</motion.div>
                <motion.div {...animationProps(3.2)} className='text-5xl'>{user?.elo}</motion.div>
            </div>

            <motion.div
                {...animationProps(3.5)}
                className='cursor-pointer bg-lightblue rounded-sm p-8'
                whileTap={{ scale: 0.95 }}
                onClick={()=>handleGameButton()}
            >PLAY</motion.div>

        </div>
    );
}

export default GameButtons;