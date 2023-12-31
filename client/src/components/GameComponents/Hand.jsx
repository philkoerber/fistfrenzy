import React, { useEffect } from 'react';
import { motion, animate, useTransform, useMotionValue, progress } from 'framer-motion';
import { interpolate } from "flubber";
import { organicCircle, hand, heart, lightning } from "../paths";

const pathArray = [organicCircle, heart, hand, lightning]

const moveToIndex = (move) => {
    if (move === "rock") { return 1 }
    if (move === "paper") { return 2 }
    if (move === "scissors") { return 3 }
    else return 0
        
}

const useFlubber = (progress, selectedMove) => useTransform(progress, [0, 1], [pathArray[0], pathArray[moveToIndex(selectedMove)]], {
    mixer: (a, b) => interpolate(a, b, {maxSegmentLength: 1})
})

function Hand({ selectedMove }) {
    const progress = useMotionValue(0)

    const path = useFlubber(progress, selectedMove)

    useEffect(() => {
        if(selectedMove){
        var animation = animate(progress, 1, {duration: 0.2})
        setTimeout(() => {
            animation = animate(progress, 0, { duration: 0.2 })
        }, 1800)
        
        return () => animation.stop();}}
    , [selectedMove])

    return (
        
            <div className='w-[40vh] h-[40vh]'>
                <svg width="100%" height="100%" viewBox='0 0 400 400'>
                        <g transform="translate(10 10) scale(17 17)">
                        <motion.path fill={"#F6AE2D"} d={path} />
                        </g>
    </svg>
            </div>
    );
}

export default React.memo(Hand);