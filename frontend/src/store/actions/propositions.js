import * as TYPES from '../constants/propositions';
import * as MODAL_TYPES from '../constants/modal';
import api from '../api/FetchData';
import {toast} from 'react-toastify';
import {deleteNeed, getNeedsByUserId} from "./need";

export const getAllPropositions = (regions, categories, page, size) => dispatch => {
    const regionsParams = regions.length ? regions.map(region => region.regionName).join(',') : '';
    const categoriesParams = categories.length ? categories.map(category => category.categoryName).join(',') : '';
    dispatch({type: TYPES.PROPOSITIONS_LOADING, payload: true})
    api.get(`/propositions?categories=${categoriesParams}&regions=${regionsParams}&page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_PROPOSITIONS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.PROPOSITIONS_LOADING, payload: false})
    })
};

export const getUserProposal = (page, size) => dispatch => {
    dispatch({type: TYPES.USER_PROPOSALS_LOADING, payload: true});
    api.get(`/propositions/current?page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_USER_PROPOSALS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.USER_PROPOSALS_LOADING, payload: false})
    })
};

export const createProposal = (data, setCreated) => {
    api.post('/propositions', data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            setCreated(true);
            toast.success('Допомогу створено');
        }
    })
};

export const getProposalById = (id, loading, setProposal) => {
    loading(true)
    api.get(`/propositions/${id}`).then(res => {
        if (res.status === 200) {
            loading(false);
            const need = res.data;
            const {categories} = need;
            need.categories = categories.map(category => category.categoryName)
            setProposal(need);
        }
    })
};

export const updateProposal= (data, id, loading, setProposal) => {
    api.put(`/propositions/${id}`, data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            console.log(res.data.message)
            toast.success(res.data.message);
            getProposalById(id, loading, setProposal)
        }
    })
};

export const deleteProposal = (id, deleted, deleting) => {
    deleting(true);
    api.deleteApi(`/propositions/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            deleted(true);
            deleting(false);
            toast.success(res.data.message);
        }
    })
};

export const openDeleteModal = (id, deleted, deleting) => dispatch => {
    dispatch({type: MODAL_TYPES.OPEN_MODAL})
    dispatch({type: MODAL_TYPES.SET_MODAL_TEXT, payload: 'Видалити Домопогу?'});
    dispatch({type: MODAL_TYPES.SET_MODAL_FUNC, payload: () => deleteProposal(id, deleted, deleting)})
};

export const getHelpsByUserId = (id, page, size) => dispatch => {
    dispatch({type: TYPES.USER_PROPOSALS_LOADING, payload: true});
    api.get(`/propositions/user/${id}?page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_USER_PROPOSALS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.USER_PROPOSALS_LOADING, payload: false})
    })
};

export const deleteHelpByAdmin = (id, userId, size) => dispatch => {
    api.deleteApi(`/propositions/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getHelpsByUserId(userId, 0, size));
            toast.success(res.data.message);
        }
    })
};

export const openAdminDeleteModal = (id, userId, size) => dispatch => {
    dispatch({type: MODAL_TYPES.OPEN_MODAL});
    dispatch({type: MODAL_TYPES.SET_MODAL_TEXT, payload: 'Видалити Потребу?'});
    dispatch({type: MODAL_TYPES.SET_MODAL_FUNC, payload: () => dispatch(deleteHelpByAdmin(id, userId, 0, size))})
};
