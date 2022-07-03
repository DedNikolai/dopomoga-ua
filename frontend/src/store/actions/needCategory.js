import * as TYPES from '../constants/needCategories';
import api from '../api/FetchData';

export const getAllCategories = () => dispatch => {
    dispatch({type: TYPES.NEEDS_CATEGORIES_LOADING, payload: true})
    api.get(`/needs-categories`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_NEEDS_CATEGORIES, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.NEEDS_CATEGORIES_LOADING, payload: false})
    })
};
