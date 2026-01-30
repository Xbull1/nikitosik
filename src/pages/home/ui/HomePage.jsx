import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gallery } from '../../../widgets/gallery/ui/Gallery';
import { VideoModal } from '../../../features/video-modal/ui/VideoModal';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../features/video-modal/model/modalSlice';
import styles from './HomePage.module.scss';

export const HomePage = () => {
    const { scrollYProgress } = useScroll();
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            {/* Global Modal */}
            <VideoModal />

            {/* Dynamic Background */}
            <div className={styles.background}>
                <div className={styles.radialGradient} />
                <div className={styles.topLine} />
            </div>

            <header className={styles.header}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={styles.title}
                >
                    Памятный альбом носителя сваги
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className={styles.subtitle}
                >
                    Мы пережили столько всего, что хватило бы на написание целой книги, а пока что тут будет визуальное представление, всего что удалось запечатлеть за долгие годы нашей с тобой дружбы, искренне тебя люблю и жду момента когда смогу дополнить этот альбом ещё сотни и сотни раз...
                </motion.p>
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className={styles.easterEggButton}
                    onClick={() => {
                        dispatch(openModal({
                            id: 'easter-egg',
                            videoUrl: '/nikita/пасхалка.mp4',
                            description: 'Секретная пасхалка',
                            date: 'Поздравление от Кости Волкова специально для моего братика',
                        }));
                    }}
                >
                    пасхалка
                </motion.button>
            </header>

            <main className={styles.main}>
                <Gallery />
            </main>

            <footer className={styles.footer}>
                <p>© {new Date().getFullYear()} Памятный альбом. В вечной разработке пока мы вместе.</p>
                <p>С любовью by Decadansov</p>
            </footer>
        </div >
    );
};
