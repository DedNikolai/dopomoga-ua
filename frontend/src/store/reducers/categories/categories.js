import * as TYPES from '../../constants/categories';

const initialState = {
    categories: [],
    categoriesLoading: true
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.CATEGORIES_LOADING:
            return {...state, categoriesLoading: action.payload};
        case TYPES.SAVE_CATEGORIES:
            return {...state, categories: action.payload};
        default:
            return {...state}
    }
};

export default categories;