import { motion } from 'framer-motion';
import { cn } from '../../../shared/lib/utils';
import styles from './PhotoCard.module.scss';

export const PhotoCard = ({ photo, onClick, className }) => {
    return (
        <motion.div
            layoutId={`card-${photo.id}`}
            whileHover={{ scale: 1.02 }}
            className={cn(styles.card, className)}
            onClick={() => onClick(photo)}
        >
            <motion.img
                layoutId={`image-${photo.id}`}
                src={photo.url}
                alt={photo.description}
                className={styles.image}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className={styles.overlay}
            >
                <p className={styles.date}>{photo.date}</p>
                <p className={styles.description}>{photo.description}</p>
            </motion.div>
        </motion.div>
    );
};
