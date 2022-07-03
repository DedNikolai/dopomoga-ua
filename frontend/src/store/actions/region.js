import * as TYPES from '../constants/regions';
import api from '../api/FetchData';

export const getAllRegions = () => dispatch => {
    dispatch({type: TYPES.REGIONS_LOADING, payload: true})
    api.get(`/regions`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_REGIONS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.REGIONS_LOADING, payload: false})
    })
};
