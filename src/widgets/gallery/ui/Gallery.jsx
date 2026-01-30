import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { PhotoCard } from '../../../entities/photo/ui/PhotoCard';
import { MOCK_PHOTOS } from '../../../entities/photo/model/types';
import { openModal } from '../../../features/video-modal/model/modalSlice';
import styles from './Gallery.module.scss';

export const Gallery = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.gallery}>
            {MOCK_PHOTOS.map((photo, index) => (
                <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: index * 0.05,
                        duration: 0.5,
                        ease: [0.32, 0.72, 0, 1] // Custom easeOut
                    }}
                >
                    <PhotoCard photo={photo} onClick={(p) => dispatch(openModal(p))} />
                </motion.div>
            ))}
        </div>
    );
};
