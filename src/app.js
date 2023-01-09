import express from "express";
import cors from "cors";

const users = [];

const tweets = [];

const server = express();
server.use(cors());
server.use(express.json());

server.listen(5000, () => {
  console.log("server is running");
});

server.post("/sign-up", (req, res) => {
  users.push(req.body);

  res.send("OK");
});

server.get("/tweets", (req, res) => {
  res.send(tweets);
});

server.post("/tweets", (req, res) => {
  const user = users.find((user) => user.username == req.body.username);

  if (user) {
    tweets.push({
      username: user.username,
      avatar: user.avatar,
      tweet: req.body.tweet,
    })
    if (tweets.length > 10) {
      tweets.shift()
    }
    res.send("OK");
  } else {
    res.send("UNAUTHORIZED");
  }
});
