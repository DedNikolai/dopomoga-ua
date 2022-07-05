import * as TYPES from '../constants/propositions';
import api from '../api/FetchData';

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
