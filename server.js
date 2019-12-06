const express = require('express');

const projectRouter = require("./users/userRouter.js")
const actionRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
    console.log(`${req.method} to ${req.originalUrl}`);
    next();
}

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

module.exports = server;