import express from 'express'

const server = express()

server.listen(5000, () => {
    console.log('server is running')
})

server.get("/", (req, res) => {
    res.send("hello world")
})
