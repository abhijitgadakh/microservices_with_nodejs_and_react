const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// posts = {
//     'post_id' :{
//         id : 'post_id',
//         title : "Title",
//         comments : [
//             {id : 'comment_id_1', content : "commet 1"},
//             {id : 'comment_id_2', content : "commet 2"}
//         ]
//     }
// }


// GET http://localhost:4003/posts
app.get("/posts", (req, res) => {

    res.status(200).send(posts)
    
})

// POST http://localhost:4003/events
app.post("/events", async (req, res) => {
    const{type, data} =  req.body;


    if(type === 'PostCreated'){
        const { id, title } = data;
        posts[id] = {id, title, comments:[]}
    }

    if(type === 'CommentCreated'){
        const { id, content, postId } = data;
        const post = posts[postId]
        post.comments.push({id, content})
    }

    console.log(posts)


    res.status(201).send({});

});

app.post("/events", (req, res) => {
    console.log("Received Event")
    console.log(req.body.type)

    res.status(201).send({});

});

app.listen(4003, ()=>{
    console.log('Listening on port 4003');
})