import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, selectSelectedPhoto } from '../model/modalSlice';
import styles from './VideoModal.module.scss';

export const VideoModal = () => {
    const dispatch = useDispatch();
    const photo = useSelector(selectSelectedPhoto);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                dispatch(closeModal());
            }
        };

        if (photo) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [photo, dispatch]);

    return (
        <AnimatePresence>
            {photo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={styles.backdrop}
                    onClick={() => dispatch(closeModal())}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => dispatch(closeModal())}
                            className={styles.closeButton}
                        >
                            <X size={20} />
                        </button>

                        {photo.videoUrl ? (
                            <motion.div
                                layoutId={`image-${photo.id}`}
                                className={styles.videoWrapper}
                            >
                                <video
                                    src={photo.videoUrl}
                                    autoPlay
                                    controls
                                    className={styles.video}
                                />
                            </motion.div>
                        ) : (
                            <motion.img
                                layoutId={`image-${photo.id}`}
                                src={photo.modalUrl || photo.url}
                                alt={photo.description}
                                className={styles.image}
                            />
                        )}

                        <div className={styles.info}>
                            <h3 className={styles.title}>{photo.description}</h3>
                            <p className={styles.date}>{photo.date}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
