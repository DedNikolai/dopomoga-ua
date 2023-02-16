import * as TYPES from '../constants/chat';
import * as USER_TYPES from '../constants/user';
import api from '../api/FetchData';
import LocalStorageService from '../../services/localStorageService';

export const getChat = (id, setMessages, currentUser, stompClient, setStompClient) => dispatch => {
    dispatch({type: TYPES.CHAT_LOADING, payload: true})
    api.get(`/chats/user/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch({type: TYPES.GET_CHAT, payload: res.data})
            setMessages(res.data.messages);

            api.get('/users/current').then(res => {
                if (res.status === 200) {
                    dispatch({type: USER_TYPES.SAVE_USER, payload: res.data})
                }
            });

            const onConnect = () => {
                const Stomp = require("stompjs");
                let SockJS = require("sockjs-client");
                SockJS = new SockJS("http://localhost:8000/api/ws");
                // SockJS = new SockJS("https://dopomoga-ua.herokuapp.com/ws");
                stompClient = Stomp.over(SockJS);
                setStompClient(stompClient);
                const token = LocalStorageService.get(LocalStorageService.Keys.TOKEN);
                stompClient.connect({'X-Authorization': `token ${token}`}, onConnected, onError);

            };

            const onConnected = () => {
                stompClient.subscribe(
                    `/topic/chats/${res.data.id}`,
                    onMessageReceived
                );
            };

            const onError = (err) => {
                console.log(err);
            };

            const onMessageReceived = (msg) => {
                let newMsg = JSON.parse(msg.body);

                setMessages( arr => [...arr, newMsg]);
                if (currentUser.id !== newMsg.user.id) {
                    console.log('puk')
                    newMsg.isRead = true;
                    api.put(`/messages/${newMsg.id}`, newMsg)
                }
            };

            onConnect()
        }
    }).finally(() => dispatch({type: TYPES.CHAT_LOADING, payload: false}))
}

export const sendMessage = message => {
    api.post('/messages', message)
}

export const getChats = (param) => dispatch => {
    dispatch({type: TYPES.CHATs_LOADING, payload: true});
    api.get(`/chats/user/current?param=${param}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch({type: TYPES.GET_CHAT_BY_USER, payload: res.data})
        }
    }).finally(() => dispatch({type: TYPES.CHATs_LOADING, payload: false}))
}