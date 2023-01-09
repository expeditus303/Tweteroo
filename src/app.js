import express from "express";
import cors from "cors";

const users = [];

const tweets = [];

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

app.post("/sign-up", (req, res) => {
  users.push(req.body);

  res.send("OK");
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.post("/tweets", (req, res) => {
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
