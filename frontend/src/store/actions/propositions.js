import * as TYPES from '../constants/propositions';
import api from '../api/FetchData';
import {toast} from 'react-toastify';

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
}

export const updateProposal= (data, id, loading, setProposal) => {
    api.put(`/propositions/${id}`, data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            console.log(res.data.message)
            toast.success(res.data.message);
            getProposalById(id, loading, setProposal)
        }
    })
}
