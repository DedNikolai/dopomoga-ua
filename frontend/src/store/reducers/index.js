import {combineReducers} from 'redux';
import user from './user/user';
import need from './need/need'

const rootReducer = combineReducers({
    user,
    need,
});

export default rootReducer;