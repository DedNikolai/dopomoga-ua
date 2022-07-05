import * as TYPES from '../constants/categories';
import api from '../api/FetchData';

export const getAllCategories = () => dispatch => {
    dispatch({type: TYPES.CATEGORIES_LOADING, payload: true})
    api.get(`/needs-categories`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_CATEGORIES, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.CATEGORIES_LOADING, payload: false})
    })
};
