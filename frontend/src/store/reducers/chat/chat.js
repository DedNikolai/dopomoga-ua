import * as TYPE from '../../constants/chat';

const initialstate = {
    chat: {},
    chatLoading: true
}

const chat = (state = initialstate, action) => {
    switch (action.type) {
        case TYPE.GET_CHAT:
            return {...state, chat: action.payload};
        case TYPE.CHAT_LOADING:
            return {...state, chatLoading :action.payload};
        default:
            return {...state}
    }
};

export default chat;