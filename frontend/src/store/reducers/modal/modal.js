import * as TYPES from '../../constants/modal'

const initialSate = {
    isOpen: false,
    modalText: '',
    confirm: () => {},
};

const modal = (state = initialSate, action) => {
    switch (action.type) {
        case TYPES.OPEN_MODAL:
            return {...state, isOpen: true};
        case TYPES.CLOSE_MODAL:
            return {...state, isOpen: false, confirm: () => {}, modalText: ''};
        case TYPES.SET_MODAL_TEXT:
            return {...state, modalText: action.payload};
        case TYPES.SET_MODAL_FUNC:
            return {...state, confirm: action.payload};
        default:
            return {...state}
    }
};

export default modal;