const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const { timeEnd } = require("console");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};


// GET http://localhost:4001/posts
app.get("/posts", (req, res) => {

    res.status(200).send(posts)
    
})

// POST http://localhost:4001/posts
app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = { id, title };

    res.status(201).send(posts[id]);

});

app.listen(4001, ()=>{
    console.log('Listening on port 4001');
})