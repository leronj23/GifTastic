$(document).ready(function () {

    var topics = [];

    // Button to start the gif search
    $("#search-btn").on("click", function (event) {

        // This line allows us to take advantage of the HTML "submit" property
        // This way we can hit enter on the keyboard and it registers the search
        // (in addition to clicks). Prevents the page from reloading on form submit.
        event.preventDefault()

        // Get search input text value
        let searchInputValue = $("#search-input").val().trim()

        // Clear search text field
        $("#search-input").val("")

        // Check to see if the search input is a duplicate
        // If not, add to seachArray and load Gifs. Add button to the top of page 
        if (topics.indexOf(searchInputValue) == -1) {

            // Add search input to Search Array
            topics.push(searchInputValue)

            // Build the query URL for the ajax request to the Giphy API
            let queryURL = buildQueryURL(searchInputValue)

            // Add Previously Search Button
            addButton(searchInputValue)

            // Load New Gifs
            loadNewGifs(queryURL)
        }
        else {

            // Build the query URL for the ajax request to the Giphy API
            let queryURL = buildQueryURL(searchInputValue)

            // Load New Gifs
            loadNewGifs(queryURL)
        }
    });

    // Pulls information from the form and build the query URL
    function buildQueryURL(searchInputValue) {

        // queryURL is the url we'll use to query the API
        let queryURL = "https://api.giphy.com/v1/gifs/search?";

        // Begin building an object to contain our API call's query parameters
        // Set the API key
        let queryParams = { "api_key": "HWCMzdIscoWEmrUmqEBvNMwMlCJaGd4q" };

        // Grab text the user typed into the search input, add to the queryParams object
        queryParams.q = searchInputValue;
        //queryParams.q = $("#search-input").val().trim();

        return queryURL + $.param(queryParams);
    }

    // Load New Gifs
    function loadNewGifs(queryURL) {

        // Empty all gifs
        $("#gifs").empty();

        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePage);
    }

    // Takes API data (JSON/object) and turns it into elements on the page
    function updatePage(gifData) {

        // Loop through and build elements for the defined number of gifs
        for (let i = 0; i < gifData.data.length; i++) {

            let gifImage = $("<img>");
            gifImage.addClass("gif-image");
            gifImage.attr("src", gifData.data[i].images.downsized_still.url);
            gifImage.attr("data-still", gifData.data[i].images.downsized_still.url);
            gifImage.attr("data-animate", gifData.data[i].images.downsized.url);
            gifImage.attr("data-state", "still");
            $("#gifs").append(gifImage);
        }
    }

    // Add Button to the top of the page
    function addButton(searchInputValue) {

        let searchedBtn = $("<button type='button' id='previousBtn' class='btn btn-primary'>" + searchInputValue + "</button>")
        searchedBtn.attr("data-searchedText", searchInputValue);
        $("#buttons").append(searchedBtn)
    }

    // Button for each gif to animate or stop animating
    // When using $(document).ready. $(document).on('click' needs to be used for click
    $(document).on('click', '.gif-image', function (e) {

        // Get the data state for each gif
        let state = $(this).attr("data-state");

        // Check the state of the gif to animate or to keep still
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Button for each gif to animate or stop animating
    // When using $(document).ready. $(document).on('click' needs to be used for click
    $(document).on('click', '#previousBtn', function (e) {

        // Get the data searchInput for each button
        let searchedTextValue = $(this).attr("data-searchedText");

        // Build the query URL for the ajax request to the Giphy API
        let queryURL = buildQueryURL(searchedTextValue);

        // Load New Gifs
        loadNewGifs(queryURL);
    });
});