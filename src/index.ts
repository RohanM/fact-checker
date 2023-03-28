import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

app.post("/fact-check", (req, res) => {
  const article = req.body.article;

  if (article) {
    res.json({ article: article });
  } else {
    res.status(400).json({ error: "Missing 'article' parameter in request body." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
