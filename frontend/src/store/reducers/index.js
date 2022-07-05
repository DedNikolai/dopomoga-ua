import {combineReducers} from 'redux';
import user from './user/user';
import need from './need/need';
import categories from './categories/categories';
import region from './region/region';
import propositions from './propositions/propositions';

const rootReducer = combineReducers({
    user,
    need,
    categories,
    region,
    propositions
});

export default rootReducer;