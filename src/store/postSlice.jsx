import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: []
    },
    reducers: {
        addPost(state, actions) {
            console.log(actions.payload.title);
            state.post.push({ id: uuidv4(), title: actions.payload.title });
        },
        // updatePost(state, actions) {
        //     console.log(actions.payload.id);
        //     state.post = { ...state.post.actions.payload,}
        // },
        removePost(state, actions) {
            console.log(actions.payload.id);
            state.post = state.post.filter(item => item.id !== actions.payload.id);
        }
    }
});
export default postSlice;
export const { getPost, addPost, removePost, filterPost } = postSlice.actions;