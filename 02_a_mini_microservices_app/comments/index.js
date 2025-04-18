const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const { timeEnd } = require("console");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// GET - http://localhost:4002/posts/:id/comments
app.get("/posts/:id/comments", (req, res) => {

    res.send(commentsByPostId[req.params.id] || [])
})

// POST - http://localhost:4002/posts/:id/comments
app.post("/posts/:id/comments", async(req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
            type : "CommentCreated",
            data : {id: commentId, content, postId:req.params.id}
        });
    res.status(201).send(comments);

});

app.post("/events", (req, res) => {
    console.log("Receeived Event")
    console.log(req.body.type)

    res.status(201).send({});

});

app.listen(4002, () => {
    console.log('Listening on port 4002');
})