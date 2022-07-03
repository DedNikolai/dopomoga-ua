import * as TYPES from '../../constants/needCategories';

const initialState = {
    needsCategories: [],
    needsCategoriesLoading: true
};

const needCategories = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.NEEDS_CATEGORIES_LOADING:
            return {...state, needsCategoriesLoading: action.payload};
        case TYPES.SAVE_NEEDS_CATEGORIES:
            return {...state, needsCategories: action.payload};
        default:
            return {...state}
    }
};

export default needCategories;