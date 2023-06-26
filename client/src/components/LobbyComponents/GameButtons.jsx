import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { helloArray } from './helloArray';
import Spinner from './Spinner';

const randomHello = () => {
    const randomIndex = Math.floor(Math.random() * helloArray.length)
    console.log(randomIndex)
    return helloArray[randomIndex]
}

const animationProps = (delay) => {
    return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 2, delay: delay },
    }
}

function GameButtons({ user, handleGameButton, loadingButton }) {

    const randomHello = () => {
    const randomIndex = Math.floor(Math.random() * helloArray.length)
    console.log(randomIndex)
    return helloArray[randomIndex]
        }
    const hello = randomHello();

    return (
        <div className='w-full h-full m-2 text-lightblue'>
            
                <div
                    className='text-[500%] text-center font-verziert text-transparent bg-clip-text 
                    bg-gradient-to-b from-black to-transparent'>
                    FI$TFRENZY
                </div>

            
                <motion.div {...animationProps(0.2)}
                    className='text-lightblue'>
                    <div className='text-[30px] -mb-2'>{hello.hello.toUpperCase()},</div>
                ({hello.language})</motion.div>
            
            
            
            
                <motion.div {...animationProps(0.4)}
                className='text-5xl text-center mb-4'>{user?.username}</motion.div>
            
            <div className='text-right'>
                <motion.div {...animationProps(1)}>your current elo is...</motion.div>
                <motion.div {...animationProps(1.2)} className='text-5xl mb-6'>{user?.elo}</motion.div>
            </div>

            <motion.div
                whileHover={{ backdropBlur: '20px' }}
                whileTap={{scale: 0.9}}
                transition={{duration: 0.2}}
                className='cursor-pointer bg-verydarkblue bg-opacity-50 w-[40%] h-[100px] mx-auto font-verziert text-5xl shadow-2xl rounded-sm p-8'
                onClick={()=>handleGameButton()}
            >
                <AnimatePresence>
                    <motion.div
                        key={loadingButton}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{opacity: 0}}
                        className='w-full h-full flex justify-center items-center'>
                        {loadingButton
                            ?
                            <Spinner /> :
                            <div className='absolute'>PLAY</div>}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

        </div>
        
    );
}

export default GameButtons;