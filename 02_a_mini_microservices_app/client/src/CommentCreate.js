import { useState } from 'react';
import axios from 'axios';

function CommentCreate({ postId }) {
    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`http://localhost:4002/posts/${postId}/comments`, { content });
            console.log('Post created successfully');
            setContent(''); // Reset the form after submission
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input  value={content} onChange={(e) => setContent(e.target.value)} className='form-control'></input>
                </div>
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CommentCreate;
