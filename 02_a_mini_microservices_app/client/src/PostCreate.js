import {userState, useState} from 'react';
import axios from 'axios';

function PostCreate() {

    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
    
        try {
            await axios.post('http://localhost:4001/posts', { title });
            // Optionally, handle successful response
            console.log('Post created successfully');
        } catch (error) {
            // Handle error
            console.error('Error creating post:', error);
        }
    };
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="form-control"/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default PostCreate;