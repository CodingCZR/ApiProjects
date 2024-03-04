// Retrieves data when enter key is pressed while typing in the search bar
function checkKey(e) {
    if (e.key === 'Enter') {
        recieveData();
    }
}

function recieveData() {
    //Resets searchbar 
    // Gets input from search bar
    let apiEndPoint = document.getElementById('searchBar').value;

    console.log(apiEndPoint);
    fetchApi(apiEndPoint)
};

function fetchApi(apiEndPoint) {
    fetch('https://search.imdbot.workers.dev/?q=' + apiEndPoint)
        .then(response => response.json())
        .then(data => {
            // Gets the results from the API
            let resultTitle = data.description.map(item => item["#TITLE"]);
            let resultYear = data.description.map(item => item["#YEAR"]);
            let resultPoster = data.description.map(item => item["#IMG_POSTER"]);
            let resultURL = data.description.map(item => item["#IMDB_URL"]);
            let resultID = data.description.map(item => item["#IMDB_ID"]);

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
                ids: resultID
            };

            displayMovie(movieInformation);
        });
}

function displayMovie(movieInformation) {
    // Assuming you have a container with the id "movieContainer"
    let container = document.getElementById('movieContainer');

    // Iterate through each result and create a card for each
    movieInformation.titles.forEach((title, index) => {

        // Create a card element
        let card = document.createElement('div');
        card.classList.add('movie-card');

        // Create elements for movie details
        let titleElement = document.createElement('h2');
        titleElement.textContent = title;

        let yearElement = document.createElement('p');
        yearElement.textContent = 'Year: ' + movieInformation.years[index];

        // Append elements to the card
        card.appendChild(titleElement);
        card.appendChild(yearElement);

        // Append the card to the container
        container.appendChild(card);
    });
}