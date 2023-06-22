import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Countdown({ phase }) {
  
  const [count, setCount] = useState(3)
  
  useEffect(() => {
    if (phase === "countdown") {
      setCount(3)
      setTimeout(() => setCount(2), 1000)
      setTimeout(() => setCount(1), 2000)
    }
    if (phase === "showdown") {
      setCount(null)
    }
    
  },[phase])

  return (
    <AnimatePresence>
      <div className='h-[10%] w-[10%] relative flex justify-center items-center'>
        <motion.div
        className='absolute text-5xl text-white'
        

        >
          <motion.div
            key={count}
            initial={{
              scale: 0,
              opacity: 0}}
            animate={{
              scale: 2,
              opacity: 1,
            }}
            exit={{
              scale: 4,
              opacity: 0
            }}>
              {count}
          </motion.div>
          
    </motion.div>
      </div>
      
    </AnimatePresence>
    
  );
}

export default Countdown;
