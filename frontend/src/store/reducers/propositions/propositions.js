import * as TYPES from '../../constants/propositions';

const initialState = {
    propositions: {},
    propositionsLoading: true,
    userProposals: [],
    userProposalsLoading: true
};

const propositions = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.PROPOSITIONS_LOADING:
            return {...state, propositionsLoading: action.payload};
        case TYPES.SAVE_PROPOSITIONS:
            return {...state, propositions: action.payload};
        case TYPES.SAVE_USER_PROPOSALS:
            return {...state, userProposals: action.payload};
        case TYPES.USER_PROPOSALS_LOADING:
            return {...state, userProposalsLoading: action.payload};
        default:
            return {...state}
    }
};

export default propositions;