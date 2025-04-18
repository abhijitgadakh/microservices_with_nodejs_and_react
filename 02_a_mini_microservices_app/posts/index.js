const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const { timeEnd } = require("console");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};


// GET http://localhost:4001/posts
app.get("/posts", (req, res) => {

    res.status(200).send(posts)
    
})

// POST http://localhost:4001/posts
app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = { id, title };

    await axios.post('http://localhost:4005/events', {
        type : "PostCreated",
        data : {id, title}
    });

    res.status(201).send(posts[id]);

});

app.post("/events", (req, res) => {
    console.log("Receeived Event")
    console.log(req.body.type)

    res.status(201).send({});

});

app.listen(4001, ()=>{
    console.log('Listening on port 4001');
})