fetch('/star_wars.json')
  .then(response => response.json())
  .then(movies => console.log(movies.Search));

