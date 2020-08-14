const express = require("express");
const server = express();
const nunjucks = require('nunjucks');

const { main, downloadFrom, uploadTo } = require('./pages')

nunjucks.configure('./public/views',{
    express: server,
    noCache: true,
})

server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"));
server.get("/", main)
server.post("/", main)
server.get("/download/:file(*)", downloadFrom)
server.post("/upload", uploadTo)





console.log(`The server is running on port 5000`)
server.listen(5000);
