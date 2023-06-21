import React from 'react';
import { motion } from 'framer-motion';

function Countdown({count}) {
  const countdownVariants = {
    start: {
      pathLength: 1,
    },
    end: {
      pathLength: 0,
    },
  };

  return (
    <div className="text-white text-5xl">
      <svg className="w-32 h-32">
              <motion.path
                key={count}
          fill="transparent"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          d="M16 1
             a 15 15 0 0 1 0 30
             a 15 15 0 0 1 0 -30"
          variants={countdownVariants}
          initial="start"
          animate="end"
          transition={{ duration: 1 }}
        />
          </svg>
          {count}
    </div>
  );
}

export default Countdown;
