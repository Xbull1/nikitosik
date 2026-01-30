import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WaveCursor.module.scss';

export const WaveCursor = () => {
    const [waves, setWaves] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Basic throttle or simple addition on movement could be overwhelming.
            // Let's create waves only periodically or on specific distance
            // For simplicity, let's create a wave every 100ms if mouse moving
        };

        const handleClick = (e) => {
            const id = Date.now();
            setWaves(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);

            // Cleanup wave after animation
            setTimeout(() => {
                setWaves(prev => prev.filter(w => w.id !== id));
            }, 1000);
        };

        window.addEventListener('click', handleClick);
        // window.addEventListener('mousemove', handleMouseMove); // Optional: add trail later if requested

        return () => {
            window.removeEventListener('click', handleClick);
            // window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Actually, user asked for "wave from cursor", likely meaning a trail that looks like waves/ripples
    // Let's implement a continuous trail of fading circles.

    const [trail, setTrail] = useState([]);

    useEffect(() => {
        let timeout;
        const addTrail = (e) => {
            const id = Math.random();
            setTrail(prev => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY }]);

            setTimeout(() => {
                setTrail(prev => prev.filter(t => t.id !== id));
            }, 800);
        };

        window.addEventListener('mousemove', addTrail);
        return () => window.removeEventListener('mousemove', addTrail);
    }, []);

    return (
        <div className={styles.waveContainer}>
            <AnimatePresence>
                {trail.map(t => (
                    <motion.div
                        key={t.id}
                        className={styles.wave}
                        initial={{ opacity: 1, scale: 0, x: t.x, y: t.y }}
                        animate={{ opacity: 0, scale: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ width: 20, height: 20 }}
                    />
                ))}
                {waves.map(w => (
                    <motion.div
                        key={w.id}
                        className={styles.wave}
                        initial={{ opacity: 1, scale: 0, x: w.x, y: w.y }}
                        animate={{ opacity: 0, scale: 5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ width: 50, height: 50, borderWidth: 2 }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
