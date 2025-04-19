import { useEffect, useState } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

function PostList() {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:4003/posts');
            setPosts(res.data);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
            if (error.response) {
                console.error('Response:', error.response.data);
            }
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map((post) => (
        <div key={post.id} className="col-md-4 mb-4">
            <div className="card shadow">
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />

                </div>
            </div>
        </div>
    ));

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Posts</h2>
            <div className="row">
                {Object.keys(posts).length ? (
                    renderedPosts
                ) : (
                    <div className="col-12 text-center">
                        <p>No posts available. Please create a new post.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostList;
