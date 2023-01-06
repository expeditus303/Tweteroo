import express from 'express'
import cors from 'cors'

const server = express()

server.use(cors())

server.listen(5000, () => {
    console.log('server is running')
})

server.get("/", (req, res) => {
    res.send("hello world")
})

server.get("/test", (req, res) => {
    res.send("test")
})
