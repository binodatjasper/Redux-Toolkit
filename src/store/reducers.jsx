import { combineReducers } from '@reduxjs/toolkit';
import commentSlice from './commentSlice';
import postSlice from './postSlice';

const rootReducer = combineReducers({
    post: postSlice.reducer,
    comment: commentSlice.reducer
});

export default rootReducer;