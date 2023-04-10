import express from "express";
import cors from "cors";

const users = [];

const tweets = []

for (let i = 0; i < 100; i++) {
  const tweet =   {
    username: "ana",
    avatar: "https://img.elo7.com.br/product/zoom/22B5B61/adesivo-redondo-sandy-bob-esponja-sandy-do-bobo-esponja.jpg",
    tweet: `eba o ric vai!!!! ${i}`
  }
  tweets.push(tweet)
}

tweets.reverse()

const tweet =   {
  username: "bob",
  avatar: "https://img.elo7.com.br/product/zoom/22B5B61/adesivo-redondo-sandy-bob-esponja-sandy-do-bobo-esponja.jpg",
  tweet: `eba a Ana vai!!!`
}
tweets.unshift(tweet)

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (
    username &&
    avatar &&
    typeof username == "string" &&
    typeof avatar == "string" &&
    Object.keys(req.body).length == 2
  ) {
    users.push(req.body);
    res.status(201).send("OK");
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});

app.get("/tweets", (req, res) => {

  const page = req.query.page

  if (page && page < 1) return res.status(400).send("Informe uma página válida")

  const limit = 10
  const start = (page - 1) * limit
  const end = page * limit
  
  if (page) {
    return res.send(tweets.slice(start, end))
  }
  res.send(tweets.slice(0, 10));
});

app.post("/tweets", (req, res) => {

  if (req.headers.user && req.body.tweet && typeof req.body.tweet == "string") {
    const user = users.find((user) => user.username == req.headers.user);

    if (user) {
      tweets.unshift({
        username: user.username,
        avatar: user.avatar,
        tweet: req.body.tweet,
      });
      res.status(201).send("OK");
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});

app.get("/tweets/:username", (req, res) => {
  const user = req.params.username;
  console.log(user)

  const userTweets = tweets.filter((t) => t.username.toLowerCase() == user.toLowerCase());

  res.send(userTweets);
});
