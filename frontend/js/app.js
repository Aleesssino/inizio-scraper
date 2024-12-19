const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const searchForm = document.getElementById("searchForm");
const downloadPdfButton = document.getElementById("downloadPdf");

function displayResults(results) {
  resultsContainer.innerHTML = "";

  downloadPdfButton.classList.add("hidden");

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

    downloadPdfButton.classList.remove("hidden");
  });
}

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (query.length > 0) {
    resultsContainer.innerHTML =
      '<li class="p-3 text-gray-500 text-center">Loading...</li>';
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
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

// Function to download PDF when the button is clicked
document.getElementById("downloadPdf").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("Arial");
  doc.setFontSize(16);
  doc.text("Search Results", 10, 10);
  doc.setFontSize(12);

  let y = 20;
  const results = [...resultsContainer.querySelectorAll("li")].map((li) => {
    const title = li.querySelector("span")?.textContent || "N/A";
    const link = li.querySelector("a")?.href || "N/A";
    return { title, link };
  });

  if (results.length > 0) {
    results.forEach((result) => {
      doc.text(`Title: ${result.title}`, 10, y);
      y += 10;
      doc.text(`Link: ${result.link}`, 10, y);
      y += 10;
    });
  } else {
    doc.text("No results to display", 10, y);
  }

  doc.save("search_results.pdf");
});
