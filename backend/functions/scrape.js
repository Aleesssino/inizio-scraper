import { scrapeGoogleSearch } from "../scraper.js";

export async function handler(event) {
  try {
    const { query } = JSON.parse(event.body);
    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Query is required" }),
      };
    }

    const results = await scrapeGoogleSearch(query);
    return {
      statusCode: 200,
      body: JSON.stringify({ results }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to scrpe search results" }),
    };
  }
}
