fetch('/star_wars.json')
  .then(response => response.text())
  .then(text => console.log(text));
