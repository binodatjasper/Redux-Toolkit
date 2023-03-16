import { combineReducers } from '@reduxjs/toolkit';
import commentSlice from './slices/commentSlice';
import postSlice from './slices/postSlice';

const rootReducer = combineReducers({
    post: postSlice.reducer,
    comment: commentSlice.reducer
});

export default rootReducer;