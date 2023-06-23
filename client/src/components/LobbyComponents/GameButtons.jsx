import React from 'react';
import { motion } from "framer-motion";
import { helloArray } from './helloArray';

const randomHello = () => {
    const randomIndex = Math.floor(Math.random() * helloArray.length)
    console.log(randomIndex)
    return helloArray[randomIndex]
}
function GameButtons({ user, handleGameButton, loadingButton }) {

    const hello = randomHello();

    return (
        <div className='h-full w-full flex flex-col justify-center items-center gap-8'>
            <div>
                <p className='text-3xl'>{hello.hello},</p>
                <p className='text-[12px]'>({hello.language})</p>
                <p className='text-5xl'>{user?.username}</p></div>
            <div>your current elo is... <p className='text-5xl'>{user?.elo}</p></div>
            <motion.div
                className='cursor-pointer bg-lightblue rounded-sm p-8'
                whileTap={{ scale: 0.95 }}
                onClick={()=>handleGameButton()}
            >PLAY</motion.div>

        </div>
    );
}

export default GameButtons;