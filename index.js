const server = require('./server.js');

const port = 4002;

server.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});
