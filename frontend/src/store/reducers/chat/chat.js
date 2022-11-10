import * as TYPE from '../../constants/chat';

const initialstate = {
    chat: {},
    chatLoading: true,
    userChats: [],
    chatsLoading: true
}

const chat = (state = initialstate, action) => {
    switch (action.type) {
        case TYPE.GET_CHAT:
            return {...state, chat: action.payload};
        case TYPE.CHAT_LOADING:
            return {...state, chatLoading :action.payload};
        case TYPE.GET_CHAT_BY_USER:
            return {...state, userChats: action.payload};
        case TYPE.CHATs_LOADING:
            return {...state, chatsLoading :action.payload};
        default:
            return {...state}
    }
};

export default chat;