import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeGoogleSearch(query) {
  try {
    // Use a user agent to mimic a browser
    const response = await axios.get(`https://www.google.com/search`, {
      params: { q: query },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    const results = [];

    // Select search result containers
    $(".yuRUbf").each((index, element) => {
      const title = $(element).find("h3").text();
      const link = $(element).find("a").attr("href");

      if (title && link) {
        results.push({ title, link });
      }
    });

    return results;
  } catch (error) {
    console.error("Error scraping Google search:", error);
    return [];
  }
}

// Example usage
async function main() {
  const searchResults = await scrapeGoogleSearch("yt");
  console.log(searchResults);
}

main();
