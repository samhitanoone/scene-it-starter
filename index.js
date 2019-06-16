document.addEventListener('DOMContentLoaded', 
function(){
    //localStorage.clear();
    function saveToWatchList(imdbID){
        console.log(imdbID);

    };
    
    function renderMovies(movieArray){
        
        function createHTML(data){
            return `<div class="movie-card card border-light mb-3" style="width: 18rem;">
				<img class="card-img-top" src="${data.Poster}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title card-title">${data.Title}</h5>
                    <p class="card-text card-release-date">${data.Year}</p>
                    <a href="#" class="btn btn-primary movie-add" id=${data.imdbID}>Add</a>
				</div>
			</div>`;

        };
        
        movieHTML = movieArray.map(createHTML);

        return movieHTML.join("");


    };

    //document.getElementsByClassName('movies-container')[0].innerHTML = renderMovies(movieData);

    document.getElementById('search-form').addEventListener('submit', function(e){
        e.preventDefault();
        moreMovies = []
        var searchString = document.getElementsByClassName('search-bar')[0].value;
        //console.log("searchString: " + searchString);
        var urlEncodedSearchString = encodeURIComponent(searchString);
        //console.log("urlEncodedSearchString: " + urlEncodedSearchString);
        axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString)
        .then(function(response){
            //console.log("SEARCH: " + response.data.Search)
            //moreMovies.push(JSON.stringify(response.data.Search));
            moreMovies.push(response.data.Search);
            //console.log("SEARCH after stringify: " + moreMovies)
            //console.log(response.data.Search[0])
            //console.log(JSON.parse(response.data.Search[0]));
            //moreMovies = JSON.parse(response.data.Search[0]);
            document.getElementsByClassName('movies-container')[0].innerHTML = renderMovies(response.data.Search);        


        $('.movie-add').on("click", function(){
            //console.log($(this).attr('id'));
            imdbID = $(this).attr('id')
            //console.log("imdbID: " + imdbID)
            var movie = moreMovies[0].filter( function (currentMovie){
                return currentMovie.imdbID == imdbID;
            });
            //console.log("testing: " + moreMovies[0].imdbID)
            //console.log("moreMovies: " + moreMovies);
            //console.log("movie found?: " + JSON.stringify(movie));
            var watchlistJSON = localStorage.getItem('watchlist');
            var watchlist = JSON.parse(watchlistJSON);
            if (watchlist == null) {
                watchlist = [];
            };
            watchlist.push(movie);
            watchlistJSON = JSON.stringify(watchlist);
            localStorage.setItem('watchlist', watchlistJSON);
            //console.log("watchlistJSON: " + watchlistJSON);
        })
        })

        

    
    })

    //document.getElementById(".btn-primary").onclick = saveToWatchList(imdbID)

    


});