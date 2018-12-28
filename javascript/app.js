// $(document).ready(function () {


    // for (var i = 0; i < 20; i++) {

    //     var button = $("<button type='button' class='btn btn-primary'>Primary " + i + "</button>")

    //     $("#buttons").append(button)

    // }


    //javascript, jQuery
    // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=HWCMzdIscoWEmrUmqEBvNMwMlCJaGd4q&limit=5");
    // xhr.done(function (data) { console.log("success got data", data); });

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=HWCMzdIscoWEmrUmqEBvNMwMlCJaGd4q&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log("success got data", response);

    });

// });


