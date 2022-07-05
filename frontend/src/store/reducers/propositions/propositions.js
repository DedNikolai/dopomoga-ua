import * as TYPES from '../../constants/propositions';

const initialState = {
    propositions: {},
    propositionsLoading: true
};

const propositions = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.PROPOSITIONS_LOADING:
            return {...state, propositionsLoading: action.payload};
        case TYPES.SAVE_PROPOSITIONS:
            return {...state, propositions: action.payload};
        default:
            return {...state}
    }
};

export default propositions;