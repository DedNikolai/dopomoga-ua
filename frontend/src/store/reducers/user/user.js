import * as TYPES from '../../constants/user';

const initialState = {
    currentUser: null,
    currentUserLoading: true,
    authLoading: false,
    newUserRegistered: false,
    signingUpOfNewUser: false,
    userConfirming: true,
    forgotPassSending: false,
    forgotPassSendSuccess: false,
    resetPassSuccess: false,
    resetPassLoading: false,
    allUsers: {},
    allUsersLoading: true
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
        case TYPES.USER_FORGOT_PASS_SENDING:
            return {...state, forgotPassSending: action.payload};
        case TYPES.FORGOT_PASS_SEND_SUCCESS:
            return {...state, forgotPassSendSuccess: action.payload};
        case TYPES.RESET_PASS_SUCCESS:
            return {...state, resetPassSuccess: action.payload};
        case TYPES.RESET_PASS_LOADING:
            return {...state, resetPassLoading: action.payload};
        case TYPES.USERS_LOADING:
            return {...state, allUsersLoading: action.payload};
        case TYPES.SAVE_USERS:
            return {...state, allUsers: action.payload};
        default:
            return {...state}
    }
};

export default user;