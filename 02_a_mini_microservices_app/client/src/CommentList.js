import { useEffect, useState } from 'react';
import axios from 'axios';

function CommentList({postId}) {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:4002/posts/${postId}/comments`);
            setComments(res.data);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
            if (error.response) {
                console.error('Response:', error.response.data);
            }
        }
    };

    useEffect(() => { fetchData()  }, []);

    const renderedComments = Object.values(comments).map((comment) => (
        <li key={comment.id}>{comment.content}</li>
    ));

    return (
        <ul> {renderedComments} </ul>
    );
}

export default CommentList;
