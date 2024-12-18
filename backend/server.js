import express from "express";
import bodyParser from "body-parser";
import { scrapeGoogleSearch } from "./scraper.js";
import cors from "cors";

const app = express();
// fix cors error
app.use(cors());

const port = 3000;

app.use(bodyParser.json());

app.post("/api/scrape", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const results = await scrapeGoogleSearch(query);
    res.json({ results });
  } catch (error) {
    console.error("Error scraping Google search:", error);
    res.status(500).json({ error: "Failed to scrape search results" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
