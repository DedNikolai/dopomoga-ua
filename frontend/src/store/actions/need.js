import * as TYPES from '../constants/need';
import * as MODAL_TYPES from '../constants/modal';
import api from '../api/FetchData';
import {toast} from 'react-toastify';

export const getAllNeeds = (regions, categories, page, size) => dispatch => {
    const regionsParams = regions.length ? regions.map(region => region.regionName).join(',') : '';
    const categoriesParams = categories.length ? categories.map(category => category.categoryName).join(',') : '';
    dispatch({type: TYPES.NEEDS_LOADING, payload: true});
    api.get(`/needs?categories=${categoriesParams}&regions=${regionsParams}&page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_NEEDS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.NEEDS_LOADING, payload: false})
    })
};

export const getUserNeeds = (page, size) => dispatch => {
    dispatch({type: TYPES.USER_NEEDS_LOADING, payload: true});
    api.get(`/needs/current?page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_USER_NEEDS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.USER_NEEDS_LOADING, payload: false})
    })
};

export const createNeed = (data, setCreated) => {
    api.post('/needs', data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            setCreated(true);
            toast.success('Потребу створено');
        }
    })
};

export const getNeedById = (id, loading, setNeed) => {
    loading(true)
    api.get(`/needs/${id}`).then(res => {
        if (res.status === 200) {
            loading(false);
            const need = res.data;
            const {categories} = need;
            need.categories = categories.map(category => category.categoryName)
            setNeed(need);
        }
    })
};

export const updateNeed = (data, id, loading, setNeed) => {
    api.put(`/needs/${id}`, data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            toast.success(res.data.message);
            getNeedById(id, loading, setNeed)
        }
    })
};

export const deleteNeed = (id, deleted, deleting) => {
    deleting(true);
    api.deleteApi(`/needs/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            deleted(true);
            deleting(false);
            toast.success(res.data.message);
        }
    })
};

export const openDeleteModal = (id, deleted, deleting) => dispatch => {
    dispatch({type: MODAL_TYPES.OPEN_MODAL})
    dispatch({type: MODAL_TYPES.SET_MODAL_TEXT, payload: 'Видалити Потребу?'});
    dispatch({type: MODAL_TYPES.SET_MODAL_FUNC, payload: () => deleteNeed(id, deleted, deleting)})
};

export const getNeedsByUserId = (id, page, size) => dispatch => {
    dispatch({type: TYPES.USER_NEEDS_LOADING, payload: true});
    api.get(`/needs/user/${id}?page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_USER_NEEDS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.USER_NEEDS_LOADING, payload: false})
    })
};

export const deleteNeedByAdmin = (id, userId) => dispatch => {
    api.deleteApi(`/needs/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getNeedsByUserId(userId))
            toast.success(res.data.message);
        }
    })
};

export const openAdminDeleteModal = (id, userId) => dispatch => {
    dispatch({type: MODAL_TYPES.OPEN_MODAL})
    dispatch({type: MODAL_TYPES.SET_MODAL_TEXT, payload: 'Видалити Потребу?'});
    dispatch({type: MODAL_TYPES.SET_MODAL_FUNC, payload: () => dispatch(deleteNeedByAdmin(id, userId))})
};


