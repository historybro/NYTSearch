//Part 1
//Do preliminary research on the [API](http://developer.nytimes.com/article_search_v2.json)
//Register for an API Key.
//FzKKJPgwBh5ymCd6tYybH5wikgYr1y4T
//Understand what format the URL should look like to make an Article Call. (Hint: Use the API Console!!)
//Experiment with console logging various fields.

//search Term:
//Number of Records to pull
//Start Year (optional)
//End Year (optional)

//Part 2
//* Create the AJAX call needed to retrieve data then console.log all of the relevant fields.
//* Incorporate various “optional parameters” (hard code these in initially).
//* Take note of various “bugs” that appear with certain searches.

//Part 3
//Put in a hard-effort to deal with bugs. How can you handle missing fields?

//Part 4
//deploy to github



var searchTerm = "";
var numberPull = "";
var startYear = "";
var endYear = "";
var articleCounter = 0;

var apiKey = "FzKKJPgwBh5ymCd6tYybH5wikgYr1y4T";
var queryURL = "https://api.nytimes.com/svc/search/v2/responseearch.json?api-key=" + apiKey + "&q=";

$("#search").on("click", function(event) {
    event.preventDefault();
    searchTerm = $("#search-term").val();
    numberPull = $("#num-records-select").val();
    startYear = $("#start-year").val();
    endYear = $("#end-year").val();
    runSearch();    

});

function runSearch() {
    $("#article").empty();
    queryURL = queryURL + searchTerm;
    // if (startYear != null) {
    //     queryURL + "&begin_date=" + startYear;
    // } else if (endYear != null) {
    //     queryURL + "&end_date=" + endYear;
    // }


    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {
        console.log("URL: " + queryURL);
        console.log(response);
        

        for (var i = 0; i < numberPull; i++){
            articleCounter++;
            var articleDiv = $("<div>").addClass("article");
            var title = response[i].headline.main;
            console.log(response[i].headline.main);
            var pubdate = response[i].pub_date;
            console.log(response[i].pub_date);
            var author = response[i].byline.original;
            console.log(response[i].byline.original);
            var section = response[i].section_name;
            console.log(response[i].section_name);
            var articleURL = response[i].web_url;
            console.log(response[i].headline.web_url);

            articleDiv.append("<h3>" + title + "</h3>");
            articleDiv.append("<p>" + author + "</p>");
            articleDiv.append("<p> Published: " + pubdate + "</p>");
            articleDiv.append("<p> Section: " + section + "</p>");
            articleDiv.append("<p><a href ='" + articleURL + "'>" + articleURL + "</a></p>");

            $("#article").append(articleDiv);
        }

    })
}

