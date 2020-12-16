const moviesList = document.getElementById('movies');

fetch('/star_wars.json')
  .then(response => response.json())
  .then(movies => showMovies(movies.Search));

function showMovies(movies) {
  console.log(movies);
  let descriptions = movies.map(movie => movie.imdbID).map(id => fetch('/new_hope.json').then(response => response.json()));
  Promise.all(descriptions).then(descriptions => console.log(descriptions));
  moviesList.innerHTML = movies
    .map(function (movie) {
      return `<li>
      <img src="${movie.Poster}">
      <div class="info">
        <div class="title">${movie.Title}</div>
        <div class="year">${movie.Year}</div>
      </div>
      </li>`;
    })
    .join('');
}