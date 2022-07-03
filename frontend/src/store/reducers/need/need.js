import * as TYPES from '../../constants/need';

const initialState = {
    needs: {},
    needsLoading: true
};

const need = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.NEEDS_LOADING:
            return {...state, needsLoading: action.payload};
        case TYPES.SAVE_NEEDS:
            return {...state, needs: action.payload};
        default:
            return {...state}
    }
};

export default need;