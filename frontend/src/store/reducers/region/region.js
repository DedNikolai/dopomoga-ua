import * as TYPES from '../../constants/regions';

const initialState = {
    regions: [],
    regionsLoading: true
};

const region = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.REGIONS_LOADING:
            return {...state, regionsLoading: action.payload};
        case TYPES.SAVE_REGIONS:
            return {...state, regions: action.payload};
        default:
            return {...state}
    }
};

export default region;