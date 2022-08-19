import * as TYPES from '../constants/categories';
import api from '../api/FetchData';
import {toast} from 'react-toastify';
import * as MODAL_TYPES from '../constants/modal';
import {deleteNeed} from "./need";

export const getAllCategories = (page, size) => dispatch => {
    dispatch({type: TYPES.CATEGORIES_LOADING, payload: true});
    api.get(`/categories?page=${page}&size==${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_CATEGORIES, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.CATEGORIES_LOADING, payload: false})
    })
};

export const updateCategory = (id, data) => dispatch => {
    api.put(`/categories/${id}`, data).then(res => {
        if (res.data.success) {
            toast.success(res.data.message);
            dispatch(getAllCategories())
        }
    })
};

export const deleteCategory = id => dispatch => {
    api.deleteApi(`/categories/${id}`).then(res => {
        if (res.data.success) {
            toast.success(res.data.message);
            dispatch(getAllCategories());
        } else {
            toast.error(res.data.message)
        }
    })
};
