import * as TYPES from '../../constants/user';

const initialState = {
    currentUser: null,
    currentUserLoading: true,
    authLoading: false,
    newUserRegistered: false,
    signingUpOfNewUser: false,
    userConfirming: true
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.USER_LOADING:
            return {...state, currentUserLoading: action.payload};
        case TYPES.SAVE_USER:
            return {...state, currentUser: action.payload};
        case TYPES.AUTH_LOADING:
            return {...state, authLoading: action.payload};
        case TYPES.NEW_USER_REGISTERED:
            return {...state, newUserRegistered: action.payload};
        case TYPES.USER_SIGNING_UP:
            return {...state, signingUpOfNewUser: action.payload};
        case TYPES.USER_CONFIRMING:
            return {...state, userConfirming: action.payload};
        default:
            return {...state}
    }
}

export default user;