// Retrieves data when enter key is pressed while typing in the search bar
function checkKey(e) {
    if (e.key === 'Enter') {
        recieveData();
    }
}

function recieveData() {
    // Gets input from search bar
    let apiEndPoint = document.getElementById('searchBar').value;

    console.log(apiEndPoint);
    fetchApi(apiEndPoint)
};

function fetchApi(apiEndPoint){
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
        console.log(resultURL)
        console.log(resultID);
    }
    )};
