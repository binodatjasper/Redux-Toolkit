import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, updateComment, removeComment } from '../store/commentSlice';

export default function Comment({ postId }) {
    const dispatch = useDispatch();
    const datas = useSelector((state) => state.comment.comments.filter((item) => item.postId === postId));
    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setformData] = useState({
        id: '',
        postId: postId,
        commentText: ''
    });

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
        dispatch(updateComment({ ...formData, [e.target.name]: e.target.value }));
    }

    const handleRemove = (item) => {
        dispatch(removeComment(item));
    }

    const handleUpdate = (item) => {
        setIsUpdate(true);
        setformData(item);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.commentText !== '') {
            if (isUpdate) {
                dispatch(updateComment(formData));
            } else {
                dispatch(addComment(formData));
            }
        }
        setIsUpdate(false);
        setformData({ ...formData, commentText: '' });
    }

    return (
        <div className="comments">
            <p className="comments-title">Comments :</p>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        <textarea rows={4} type="text" name="commentText" onChange={handleChange} value={formData.commentText} className="form-control" placeholder="Enter comment" />
                    </div>
                    <div className="col-sm-6">
                        <button type="submit" className={isUpdate ? 'btn btn-sm btn-success' : 'btn btn-sm btn-primary'}>{isUpdate ? 'update Comment' : 'Add Comment'}</button>
                    </div>
                </div>
            </form>
            {datas.length > 0 ? <ul>
                {datas.map((item, i) => {
                    return (
                        <li key={i}>
                            <span>
                                <i class="fa-solid fa-quote-left"></i>
                                <i className="comment-text">{item.commentText}</i>
                                <i class="fa-solid fa-quote-right"></i>
                            </span>
                            <span>
                                <button type="button" className="btn btn-success" onClick={() => handleUpdate(item)}>
                                    <i className="fa-solid fa-edit"></i>
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => handleRemove(item)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </span>
                        </li>
                    );
                })}
            </ul> : <p className="no-comment">No comments yet!</p>}
        </div>
    );
}