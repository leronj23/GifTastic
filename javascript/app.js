$( document ).ready(function() {
    
    


    for(var i = 0; i < 20 ; i++){

        var button = $("<button type='button' class='btn btn-primary'>Primary " + i + "</button>")

        $("#buttons").append(button)

    }
});