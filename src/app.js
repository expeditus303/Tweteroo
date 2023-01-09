import express from "express";
import cors from "cors";

const users = [];

const tweets = [];

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

app.post("/sign-up", (req, res) => {
  if (
    typeof req.body.username == "string" &&
    typeof req.body.avatar == "string" &&
    Object.keys(req.body).length == 2
  ) {
    users.push(req.body);
    res.status(201).send('OK')
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.post("/tweets", (req, res) => {
  if (
    req.body.username &&
    typeof req.body.tweet == "string" &&
    Object.keys(req.body).length == 2
  ) {
    const user = users.find((user) => user.username == req.body.username);

    if (user) {
      tweets.push({
        username: user.username,
        avatar: user.avatar,
        tweet: req.body.tweet,
      });
      if (tweets.length > 10) {
        tweets.shift();
      }
      res.status(201).send('OK')
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});
