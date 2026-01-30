import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './ParticleCursor.module.scss';

export const ParticleCursor = () => {
    const cursorRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the main cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX - 4); // Center offset
            mouseY.set(e.clientY - 4);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <div className={styles.cursorContainer}>
            <motion.div
                className={styles.particle}
                style={{
                    x: springX,
                    y: springY,
                    opacity: 0.8,
                    scale: 1.5
                }}
            />
            {/* We could add more particles here for a trail effect, 
                 but for performance in React without Canvas, a single smooth spring 
                 plus maybe 2-3 trailing dots is best. */}
            <motion.div
                className={styles.particle}
                style={{
                    x: useSpring(mouseX, { damping: 40, stiffness: 200 }),
                    y: useSpring(mouseY, { damping: 40, stiffness: 200 }),
                    opacity: 0.4,
                    scale: 1
                }}
            />
        </div>
    );
};
