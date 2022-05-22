import LocalStorageService from '../../services/localStorageService';
import * as TYPES from '../constants/user';
import api from '../api/FetchData';
import { toast } from 'react-toastify';

export const userSignIn = (data) => dispatch => {
    dispatch({type: TYPES.AUTH_LOADING, payload: true});
    api.post('/auth/signin', data).then(res => {
        dispatch({type: TYPES.AUTH_LOADING, payload: false});
        if (res.status === 200) {
            const token = res.data.accessToken;
            LocalStorageService.set(LocalStorageService.Keys.TOKEN, token);
            dispatch(getCurrentUser());
        }
    }).catch(() => {
        dispatch({type: TYPES.USER_LOADING, payload: false});
        toast.error('Wrong password or email!');
    }).finally(() => {
        dispatch({type: TYPES.AUTH_LOADING, payload: false})
    })
};

export const getCurrentUser = () => dispatch => {
    dispatch({type: TYPES.USER_LOADING, payload: true})
    api.get('/users/current').then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_USER, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.USER_LOADING, payload: false})
    })
};

export const userSignOut = () => dispatch => {
    LocalStorageService.delete(LocalStorageService.Keys.TOKEN);
    dispatch({type: TYPES.SAVE_USER, payload: null});
    dispatch(getCurrentUser())
};

export const userSignUp = data => dispatrh => {
    dispatrh({type: TYPES.USER_SIGNING_UP, payload: true});
    api.post('/auth/signup', data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            if (res.data.success) {
                dispatrh({type: TYPES.NEW_USER_REGISTERED, payload: true});
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }
    }).finally(() => dispatrh({type: TYPES.USER_SIGNING_UP, payload: false}))
};

export const resetSignUp = () => dispatch => {
    dispatch({type: TYPES.NEW_USER_REGISTERED, payload: false});
};

export const confirmUser = token => dispatch => {
    dispatch({type: TYPES.USER_CONFIRMING, payload: true})
    api.get(`/user/confirm-registration?token=${token}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message)
            }

        }
    }).finally(() => dispatch({type: TYPES.USER_CONFIRMING, payload: false}))
};