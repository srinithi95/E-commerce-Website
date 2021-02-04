import { combineReducers } from 'redux';
import receiptReducer from './receiptReducer';
import userReducer from './userReducer';
import inventoryReducer from './inventoryReducer'
import itemReducer from './itemReducer'

export default combineReducers({
  receiptReducer,
  userReducer,
  inventoryReducer,
  itemReducer,
});