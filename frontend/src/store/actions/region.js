import * as TYPES from '../constants/regions';
import api from '../api/FetchData';
import {toast} from 'react-toastify';

export const getAllRegions = (page, size) => dispatch => {
    dispatch({type: TYPES.REGIONS_LOADING, payload: true})
    api.get(`/regions?page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_REGIONS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.REGIONS_LOADING, payload: false})
    })
};

export const updateRegion = (id, data, page, size) => dispatch => {
    api.put(`/regions/${id}`, data).then(res => {
        if (res.data.success) {
            toast.success(res.data.message);
            dispatch(getAllRegions(page, size))
        }
    })
};

export const deleteRegion = (id, page, size) => dispatch => {
    api.deleteApi(`/regions/${id}`).then(res => {
        if (res.data.success) {
            toast.success(res.data.message);
            dispatch(getAllRegions(page, size));
        } else {
            toast.error(res.data.message)
        }
    })
};

export const createRegion = (data, setCreated, page, size) => dispatch => {
    api.post('/regions', data).then(res => {
        if (res.data.success) {
            setCreated(true);
            toast.success(res.data.message);
            dispatch(getAllRegions(page, size))
        } else {
            toast.error(res.data.message)
        }
    })
};