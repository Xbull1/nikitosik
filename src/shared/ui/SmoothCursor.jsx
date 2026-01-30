import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import styles from './SmoothCursor.module.scss';

export const SmoothCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 }; // Softer spring
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 10); // Center standard 20px cursor
            cursorY.set(e.clientY - 10);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <motion.div
            className={styles.cursor}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        />
    );
};
