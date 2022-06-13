import * as TYPES from '../../constants/need';

const initialState = {
    needs: null,
    needsLoading: false
};

const need = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.NEEDS_LOADING:
            return {...state, needs: action.payload};
        case TYPES.SAVE_NEEDS:
            return {...state, needsLoading: action.payload};
        default:
            return {...state}
    }
};

export default need;