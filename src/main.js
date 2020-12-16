const moviesList = document.getElementById('movies');

function showMovies(movies) {
  console.log(movies);
  moviesList.innerHTML = movies
    .map(function (movie) {
      return `<li>
      <img src="${movie.Poster}">
      <div class="info">
        <div class="title">${movie.Title}</div>
        <div class="rating">${movie.Ratings[0].Value}</div>
        <div class="plot">${movie.Plot}</div>
      </div>
      </li>`;
    })
    .join('');
}

function getMovies(search = 'star wars') {
  fetch('/star_wars.json')
    .then(response => response.json())
    .then(movies => {
      let descriptions = movies.Search
        .map(movie => movie.imdbID)
        .map(id => fetch('/new_hope.json').then(response => response.json()));
      Promise.all(descriptions).then(descriptions => showMovies(descriptions));      
    });
}

getMovies();
