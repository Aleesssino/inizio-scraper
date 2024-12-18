const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const searchForm = document.getElementById("searchForm");

function displayResults(results) {
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML =
      '<li class="p-3 text-gray-500 text-center">No results found.</li>';
    return;
  }

  results.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className =
      "p-3 hover:bg-blue-50 cursor-pointer text-gray-700 text-center overflow-hidden";

    const contentDiv = document.createElement("div");
    contentDiv.className = "flex flex-col items-start space-y-1";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = item.title;
    titleSpan.className = "font-medium truncate w-full";
    const link = document.createElement("a");
    link.href = item.link;
    link.textContent = item.link;
    link.target = "_blank";
    link.className =
      "text-blue-500 hover:underline break-words truncate w-full";
    contentDiv.appendChild(titleSpan);
    contentDiv.appendChild(link);

    listItem.appendChild(contentDiv);

    resultsContainer.appendChild(listItem);
  });
}

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (query.length > 0) {
    resultsContainer.innerHTML =
      '<li class="p-3 text-gray-500 text-center">Loading...</li>';
    try {
      const response = await fetch("http://localhost:3000/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }), // Send query as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await response.json();

      if (data.results) {
        displayResults(data.results);
      } else {
        displayResults([]);
      }
    } catch (error) {
      console.error(error);
      resultsContainer.innerHTML =
        '<li class="p-3 text-red-500 text-center">An error occurred. Please try again.</li>';
    }
  } else {
    resultsContainer.innerHTML = "";
  }
});
