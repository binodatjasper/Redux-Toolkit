import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const commentsItem = localStorage.getItem('comments') != null ? JSON.parse(localStorage.getItem('comments')) : [];
const updateLocalStorage = (state) => {
    localStorage.setItem('comments', JSON.stringify(state.comments.map(item => item)));
}

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: commentsItem
    },
    reducers: {
        addComment(state, actions) {
            state.comments.push({
                id: uuidv4(),
                postId: actions.payload.postId,
                commentText: actions.payload.commentText,
                isActive: actions.payload.isActive
            });
            updateLocalStorage(state);
        },
        updateComment(state, actions) {
            state.comments.filter((item, i) => {
                if (item.id === actions.payload.id) {
                    state.comments[i] = actions.payload
                }
            });
            updateLocalStorage(state);
        },
        removeComment(state, actions) {
            state.comments = state.comments.filter(item => item.id !== actions.payload.id);
            updateLocalStorage(state);
        }
    }
});
export default commentSlice;
export const { addComment, updateComment, removeComment } = commentSlice.actions;