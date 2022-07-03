import {combineReducers} from 'redux';
import user from './user/user';
import need from './need/need';
import needCategories from './needCategories/needCategories';
import region from './region/region';

const rootReducer = combineReducers({
    user,
    need,
    needCategories,
    region
});

export default rootReducer;