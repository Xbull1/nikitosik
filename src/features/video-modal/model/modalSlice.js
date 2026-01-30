import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedPhoto: null,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.selectedPhoto = action.payload;
        },
        closeModal: (state) => {
            state.selectedPhoto = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectSelectedPhoto = (state) => state.modal.selectedPhoto;

export default modalSlice.reducer;
