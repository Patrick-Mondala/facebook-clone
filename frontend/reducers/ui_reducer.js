import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';

//uiReducer
export default combineReducers({
    modal: modalReducer
});