import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { addPost, removePost, updatePost } from '../store/slices/postSlice';
import { removeCommentByPostId } from "../store/slices/commentSlice";

import Comment from './Comment';

export default function Post() {
    const dispatch = useDispatch();
    const datas = useSelector(state => state.post.posts);
    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setformData] = useState({
        id: '',
        title: '',
        isActive: false
    });

    const scrolltoTop = () => window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setformData({ ...formData, [e.target.name]: e.target.value, });
            if (isUpdate) {
                dispatch(updatePost({ ...formData, [e.target.name]: e.target.value, }));
                toast.success('Post is updated !!!');
            }
        } else {
            setformData({ ...formData, isActive: e.target.checked });
            if (isUpdate) {
                dispatch(updatePost({ ...formData, isActive: e.target.checked }));
                toast.success('Post is updated !!!');
            }
        }
    }

    const handleRemove = (item) => {
        dispatch(removePost(item));
        dispatch(removeCommentByPostId(item));
        toast.error('Post is removed !!!');
    }

    const handleUpdate = (item) => {
        setIsUpdate(true);
        setformData(item);
        scrolltoTop();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title !== '') {
            if (isUpdate) {
                dispatch(updatePost(formData));
                toast.success('Post is updated !!!');
            } else {
                dispatch(addPost(formData));
                toast.info('Post is added !!!');
            }
        }
        setIsUpdate(false);
        setformData({ ...formData, title: '', isActive: false });
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        <input type="text" name="title" onChange={handleChange} value={formData.title} className="form-control" placeholder="Enter title" />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="isActive">
                            <input type="checkbox" onChange={handleChange} name="isActive" id="isActive" checked={formData.isActive} />
                            is Active
                        </label>
                    </div>
                    <div className="col-sm-12">
                        <button type="submit" className={isUpdate ? 'btn btn-success' : 'btn btn-primary'}>{isUpdate ? 'Update Post' : 'Add Post'}</button>
                    </div>
                </div>
            </form>

            <hr />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Title</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <>
                    {datas.map((item, i) => {
                        return (
                            <tbody key={i}>
                                < tr style={{ background: "#2c3e50", color: "#fff" }}>
                                    <td style={{ paddingTop: 15, textAlign: "center" }}>{i + 1}</td>
                                    <td style={{ paddingTop: 15 }}>{item.title}</td>
                                    <td style={{ paddingTop: 13 }}>
                                        <span className={item.isActive ? 'badge badge-lg rounded-pill bg-success' : 'badge rounded-pill bg-danger'}>  {item.isActive ? 'Active' : 'Deactive'} </span>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-success" onClick={() => handleUpdate(item)}>
                                            <i className="fa-solid fa-edit"></i>
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => handleRemove(item)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <Comment postId={item.id} />
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </>
            </table >
        </div >
    );
}