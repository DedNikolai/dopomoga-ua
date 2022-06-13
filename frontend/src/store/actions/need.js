import * as TYPES from '../constants/need';
import api from '../api/FetchData';

export const getAllNeeds = (categories, regions) => dispatch => {
    dispatch({type: TYPES.NEEDS_LOADING, payload: true});
    api.get(`/api/v1/needs?categories=${categories}&regions=${regions}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch({type: TYPES.SAVE_NEEDS, payload: res.data})
        }
    }).finally(() => dispatch({types: TYPES.NEEDS_LOADING, payload: false}))
};
