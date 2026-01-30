import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../../features/video-modal/model/modalSlice';

export const store = configureStore({
    reducer: {
        modal: modalReducer,
    },
});
