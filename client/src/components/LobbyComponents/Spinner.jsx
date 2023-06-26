import React from 'react';
import { motion } from 'framer-motion';

function Spinner(props) {


  return (
        <motion.div
        className='flex justify-center items-center w-fit h-fit'
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <motion.div
        className="border-1 border-t-2 rounded-full h-16 w-16"
                style={{
            borderTopColor: "#4BA3C3",
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
        
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1+Math.random(), repeat: Infinity, ease: 'backInOut' }}
      ></motion.div>
      </motion.div>
      
      
  );
}

export default Spinner;