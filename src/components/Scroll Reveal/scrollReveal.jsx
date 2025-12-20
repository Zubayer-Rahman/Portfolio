import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

const ScrollReveal = ({
    children,
    direction = 'up',      // up, down, left, right
    duration = 0.5,
    delay = 0,
    distance = 100,
    threshold = 0.3,       // How much visible to trigger (0-1)
    className = '',
    style = {}
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: threshold });
    const controls = useAnimation();

    // Direction offsets
    const directions = {
        up: { y: distance, x: 0 },
        down: { y: -distance, x: 0 },
        left: { x: -distance, y: 0 },
        right: { x: distance, y: 0 }
    };

    const hiddenState = {
        opacity: 0,
        ...directions[direction]
    };

    const visibleState = {
        opacity: 1,
        x: 0,
        y: 0
    };

    useEffect(() => {
        if (isInView) {
            controls.start(visibleState);
        } else {
            controls.start(hiddenState);
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={style}
            initial={hiddenState}
            animate={controls}
            transition={{
                duration,
                delay,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;