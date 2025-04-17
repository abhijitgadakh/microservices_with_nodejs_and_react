import { useState } from 'react';
import axios from 'axios';

function PostCreate() {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4001/posts', { title });
            console.log('Post created successfully');
            setTitle(''); // Reset the form after submission
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Create a New Post</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control"
                                placeholder="Enter post title"
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostCreate;
