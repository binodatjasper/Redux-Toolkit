import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, removePost, updatePost } from '../store/postSlice';

export default function Post() {
    const dispatch = useDispatch();
    const datas = useSelector((state) => state.posts);
    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setformData] = useState({
        title: '',
        isActive: false
    });

    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setformData({ ...formData, [e.target.name]: e.target.value, });
        } else {
            setformData({ ...formData, isActive: e.target.checked });
        }
    }

    const handleRemove = (item) => {
        dispatch(removePost(item));
    }

    const handleUpdate = (item) => {
        setIsUpdate(true);
        setformData(item);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title !== '') {
            if (isUpdate) {
                dispatch(updatePost(formData));
            } else {
                dispatch(addPost(formData));
            }
        }
        setIsUpdate(false);
        setformData({ ...formData, title: '', isActive: false });
    }

    return (
        <div className="container">

            <h1>CRUD App with Redux Toolkit</h1>
            <hr />
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
                        <button type="submit" className={isUpdate ? 'btn btn-success' : 'btn btn-primary'}>{isUpdate ? 'update Post' : 'Add Post'}</button>
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.title}</td>
                                <td>
                                    <span>
                                        {
                                            item.isActive ? 'Active' : 'Deactive'
                                        }
                                    </span>
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
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}