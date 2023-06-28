import React from 'react';
import {AnimatePresence, motion} from "framer-motion"

function CurrentTurn({currentTurnNumber}) {
    return (
        <AnimatePresence>
            <motion.div
                key={currentTurnNumber}
                className='absolute w-full h-full top-0 left-0 flex justify-center items-center text-center text-[70vh] font-verziert text-transparent bg-clip-text bg-gradient-to-b from-verydarkblue to-black'
                initial={{ y: "100%", opacity: 1}}
                animate={{ y: 0, opacity: 1}}
                exit={{y: "-100%", opacity: 1}}
                transition={{duration: 1}}>
            {currentTurnNumber}
        </motion.div>
        </AnimatePresence>
        
    );
}

export default CurrentTurn;