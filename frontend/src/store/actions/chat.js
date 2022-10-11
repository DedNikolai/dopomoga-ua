import * as TYPES from '../constants/chat';
import api from '../api/FetchData';

export const getChat = id => dispatch => {
    dispatch({type: TYPES.CHAT_LOADING, payload: true})
    api.get(`/chats/user/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch({type: TYPES.GET_CHAT, payload: res.data})
        }
    }).finally(() => dispatch({type: TYPES.CHAT_LOADING, payload: false}))
}