import * as TYPES from '../constants/need';
import api from '../api/FetchData';
import { stepClasses } from '@mui/material';

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
}

export const createNeed = (data, setCreated) => {
    console.log(data)
    // setCreated(true);
};
