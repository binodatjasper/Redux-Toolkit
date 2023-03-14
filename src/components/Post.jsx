import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, removePost } from '../store/postSlice';

export default function Post() {
    const dispatch = useDispatch();
    const datas = useSelector((state) => state.post);

    const [formData, setformData] = useState({
        title: ''
    });

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleRemove = (item) => {
        dispatch(removePost(item));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title !== '') {
            dispatch(addPost(formData));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <h1>Redux Toolkit</h1>
                    <hr />
                    <form action="" onSubmit={handleSubmit}>
                        <input type="text" name="title" onChange={handleChange} className="form-control" />
                        <br />
                        <button className='btn btn-primary'>Get Post</button>
                    </form>
                    <hr />
                    <ul>
                        {datas.map((item, i) => {
                            return (
                                <li key={i}>
                                    <h4>{item.title}</h4>
                                    <button type="button" className="btn btn-danger" onClick={() => handleRemove(item)}>Delete</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}