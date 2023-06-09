import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import { OpenAI } from "langchain";
import { FactCheckChain } from "./chains/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

app.post("/fact-check", async (req, res) => {
  const article = req.body.article;

  if (article) {
    const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });

    const chain = new FactCheckChain({ llm: model });
    const result = await chain.call({ article: article });

    res.json({ text: result.claims })
  } else {
    res.status(400).json({ error: "Missing 'article' parameter in request body." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
