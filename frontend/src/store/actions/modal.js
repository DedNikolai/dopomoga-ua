import * as TYPES from '../constants/modal';

export const openModal = () => dispatch => {
    dispatch({type: TYPES.OPEN_MODAL})
};

export const closeModal = () => dispatch => {
    dispatch({type: TYPES.CLOSE_MODAL})
};