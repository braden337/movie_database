const moviesList = document.getElementById('movies');

fetch('/star_wars.json')
  .then(response => response.json())
  .then(movies => showMovies(movies.Search));

function showMovies(movies) {
  console.log(movies);
  moviesList.innerHTML = movies
    .map(function (movie) {
      return `<li>${movie.Title}</li>`;
    })
    .join('');
}
