const moviesList = document.getElementById('movies');
const movieInput = document.getElementById('search');

// const testing_search = '/star_wars.json';
// const testing_movie = '/new_hope.json';

const testing_search = null;
const testing_movie = null;

movieInput.addEventListener('keyup', search);

function showMovies(movies) {
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

function getURL(name, value) {
  let url = new URL('https://www.omdbapi.com');
  let params = new URLSearchParams();
  params.append('apikey', 'ae7826ed');
  params.append(name, value);
  url.search = params;
  return url.href;
}

function getMovies(search = 'star wars') {
  let url = getURL('s', search);
  fetch(testing_search || url)
    .then(response => response.json())
    .then(movies => {
      let descriptions = movies.Search.map(movie => movie.imdbID).map(id => {
        let url = getURL('i', id);
        return fetch(testing_movie || url).then(response => response.json());
      });
      Promise.all(descriptions).then(descriptions => showMovies(descriptions));
    });
}

getMovies();

function search(e) {
  let movie = movieInput.value;
  if (e.key === 'Enter' && movie !== '') {
    getMovies(movie);
    movieInput.value = '';
  }
}
