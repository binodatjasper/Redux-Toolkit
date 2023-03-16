import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const postsItem = localStorage.getItem('posts') != null ? JSON.parse(localStorage.getItem('posts')) : [];
const updateLocalStorage = (state) => {
    localStorage.setItem('posts', JSON.stringify(state.posts.map(item => item)));
}

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: postsItem
    },
    reducers: {
        addPost(state, actions) {
            state.posts.push({
                id: uuidv4(),
                title: actions.payload.title,
                isActive: actions.payload.isActive
            });
            updateLocalStorage(state);
        },
        updatePost(state, actions) {
            state.posts.filter((item, i) => {
                if (item.id === actions.payload.id) {
                    state.posts[i] = actions.payload
                }
            });
            updateLocalStorage(state);
        },
        removePost(state, actions) {
            state.posts = state.posts.filter(item => item.id !== actions.payload.id);
            updateLocalStorage(state);
        }
    }
});
export default postSlice;
export const { addPost, updatePost, removePost } = postSlice.actions;