const express = require('express');

const projectRouter = require("./data/routers/projectRouter.js")
const actionRouter = require('./data/routers/actionRouter.js');

const server = express();

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;