document.addEventListener('DOMContentLoaded', 
function(){
   
    //var watchList = JSON.parse(localStorage.getItem('watchlist'));
    var watchList = JSON.parse(localStorage.getItem('watchlist'));
    //console.log(typeof watchList[0][0]);
    //console.log(watchList[0][0]);
    // console.log("first: " + JSON.stringify(watchList[0]));
    // console.log("second: " + JSON.stringify(watchList[1]));
    // console.log("third: " + JSON.stringify(watchList[2]));

    function renderMovies(movieArray){
        
        function createHTML(data){
            return `<div class="movie-card card border-light mb-3" style="width: 18rem;">
				<img class="card-img-top" src="${data.Poster}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title card-title">${data.Title}</h5>
                    <p class="card-text card-release-date">${data.Year}</p>
				</div>
			</div>`;

        };

        var finalHTML = []

        var i;
        for (i = 0; i < movieArray.length; i++) { 
            finalHTML.push(movieArray[i].map(createHTML))
        }
        
        //movieHTML = movieArray.map(createHTML);

        return finalHTML.join("");
    };

    document.getElementsByClassName('movies-container')[0].innerHTML = renderMovies(watchList);

    //console.log(renderMovies(watchList))
});