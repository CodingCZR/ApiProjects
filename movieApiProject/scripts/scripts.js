// Retrieves data when enter key is pressed while typing in the search bar
function checkKey(e) {
  if (e.key === "Enter") {
    recieveData();
  }
}

function recieveData() {
  // Gets input from search bar
  let apiEndPoint = document.getElementById("searchBar").value;

  console.log(apiEndPoint);
  fetchApi(apiEndPoint);
}

// Fetch API Data => Stuctures Data for Cards
function fetchApi(apiEndPoint) {
  fetch("https://search.imdbot.workers.dev/?q=" + apiEndPoint)
    .then((response) => response.json())
    .then((data) => {
      // Gets the results from the API
      let resultTitle = data.description.map((item) => item["#TITLE"]);
      let resultYear = data.description.map((item) => item["#YEAR"]);
      let resultPoster = data.description.map((item) => item["#IMG_POSTER"]);
      let resultURL = data.description.map((item) => item["#IMDB_URL"]);
      let resultID = data.description.map((item) => item["#IMDB_ID"]);

      console.log(resultTitle);
      console.log(resultYear);
      console.log(resultPoster);
      console.log(resultURL);
      console.log(resultID);

      // Store results in an object
      let movieInformation = {
        titles: resultTitle,
        years: resultYear,
        posters: resultPoster,
        urls: resultURL,
        ids: resultID,
      };

      displayMovie(movieInformation);
    });
}

// Creates Cards from API Information
function displayMovie(movieInformation) {
  let container = document.getElementById("movieContainer");

  movieInformation.titles.forEach((title, index) => {
    let card = document.createElement("div");
    card.classList.add("movie-card");

    // Create a link for the entire movie card
    let movieLink = document.createElement("a");
    movieLink.href = movieInformation.urls[index];
    movieLink.target = "_blank"; // Open link in a new tab/window

    // Create an element for movie title
    let titleElement = document.createElement("h2");
    titleElement.textContent = title;

    // Create an element for movie poster
    let posterElement = document.createElement("img");
    posterElement.src = movieInformation.posters[index];
    posterElement.alt = title + " Poster";

    let yearElement = document.createElement("p");
    yearElement.textContent = "Year: " + movieInformation.years[index];

    // Append elements to the link
    movieLink.appendChild(titleElement);
    movieLink.appendChild(posterElement);
    movieLink.appendChild(yearElement);

    // Append the link to the card
    card.appendChild(movieLink);

    // Append the card to the container
    container.appendChild(card);
  });
}
