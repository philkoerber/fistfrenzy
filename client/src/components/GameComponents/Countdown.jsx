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
      <div className='h-[10%] w-[10%] relative flex justify-center items-center font-normal'>
        <motion.div
        className='absolute text-5xl'
        

        >
          <motion.div
            key={count}
            initial={{
              scale: 0,
              color: "#ffffff",
              opacity: 0}}
            animate={{
              scale: 3,
              color: "#F6AE2D",
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
