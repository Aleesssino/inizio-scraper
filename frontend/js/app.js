const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const searchForm = document.getElementById("searchForm");

const dummyData = [
  { id: 1, title: "Google" },
  { id: 2, title: "YouTube" },
  { id: 3, title: "Facebook" },
  { id: 5, title: "GitHub" },
];

function filterResults(query) {
  return dummyData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );
}

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
      "p-3 hover:bg-blue-50 cursor-pointer text-gray-700 text-center";
    listItem.textContent = item.title;

    resultsContainer.appendChild(listItem);
  });
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query.length > 0) {
    const filteredResults = filterResults(query);
    displayResults(filteredResults);
  } else {
    resultsContainer.innerHTML = "";
  }
});
