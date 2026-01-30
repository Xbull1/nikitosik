import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import styles from './GlowCursor.module.scss';

export const GlowCursor = () => {
    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);

    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX - 200); // Center standard 400px cursor (400/2 = 200)
            mouseY.set(e.clientY - 200);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <motion.div
            className={styles.cursor}
            style={{
                x: springX,
                y: springY,
            }}
        />
    );
};
