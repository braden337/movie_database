const TESTING = false;

const moviesList = document.getElementById('movies');
const movieInput = document.getElementById('search');

const omdbURL = new URL('https://www.omdbapi.com');
const params = new URLSearchParams();
params.append('apikey', 'ae7826ed');

movieInput.addEventListener('keyup', search);
getMovies();

function showMovies(movies) {
  moviesList.innerHTML = movies
    .map(
      movie => `<li>
      <img src="${movie.Poster}">
      <div class="info">
        <div class="title">${movie.Title}</div>
        <div class="rating">${movie.Ratings[0].Value}</div>
        <div class="plot">${movie.Plot}</div>
      </div>
      </li>`
    )
    .join('');
}

function getUrlWithParam(name, value) {
  params.append(name, value);
  omdbURL.search = params;
  let url = omdbURL.href;
  params.delete(name);
  return url;
}

function getMovies(search = 'star wars') {
  fetch(TESTING ? '/star_wars.json' : getUrlWithParam('s', search))
    .then(response => response.json())
    .then(result =>
      Promise.all(
        result.Search.map(movie => movie.imdbID).map(id =>
          fetch(
            TESTING ? '/new_hope.json' : getUrlWithParam('i', id)
          ).then(response => response.json())
        )
      ).then(showMovies)
    );
}

function search(event) {
  let movie = movieInput.value;
  if (event.key === 'Enter' && movie !== '') {
    getMovies(movie);
    movieInput.value = '';
  }
}
