let favoriteSeries = [];
let totalSeries = []; //Guardamos todas las series que buscamos para después poder selecionar las favoritas
let seriesContainer = document.querySelector(".js-series");
let inputText = document.querySelector(".js-input");
let button = document.querySelector(".js-button");
let favorites = document.querySelector(".js-favorites");
let apiResult = [];

//Función reusable para pintar la lista de series. Si tiene imagen que la pinte si no, que ponga la otra
// CAMBIAR INNER y esas cositas
function handlerPaint(array) {
  let content = "";
  array.forEach(function (serie) {
    if (serie.show.image) {
      content += `<li class="js-li list-element"> <img class="img"  src="${serie.show.image.medium}"> ${serie.show.name} </li>`;
    } else {
      content += `<li class="js-li list-element"> <img class="img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"> ${serie.show.name} </li>`;
    }
    pushSeriestoObject(serie);
  });
  seriesContainer.innerHTML = `<ul"> ${content}</ul>`;
  listenClickFavorites(); //Llamamos aquí a la función (4)
}

//FUNCIÓN PARA  Pushear los datos al array TOTALSERIES.
function pushSeriestoObject(serie) {
  if (serie.show.image) {
    totalSeries.push({
      name: `${serie.show.name}`,
      image: `${serie.show.image.medium}`,
    });
  } else {
    totalSeries.push({
      name: `${serie.show.name}`,
      image: `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`,
    });
  }
}

//1) Si está en el Local Storage lo coge y lo mete en apiResult
if (localStorage.getItem("apiResult")) {
  apiResult = JSON.parse(localStorage.getItem("apiResult"));
}
//2) Función para coger el valor del input para extraer los objetos de la API, se lo pedimos a la API

function result() {
  fetch(`http://api.tvmaze.com/search/shows?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      handlerPaint(data);
      apiResult.push({
        searchValue: inputText.value,
        results: data,
      });
      localStorage.setItem("apiResult", JSON.stringify(apiResult)); //Si no estaba en caché lo añadimos
    });
}
//3) Función para comprobar si está en el caché o no. Llamamos a la que nos extrae el valor del input y la que nos pinta las cositas.
function comprobationCache(event) {
  event.preventDefault();
  let cachedResult = apiResult.find(
    (item) => item.searchValue === inputText.value
  );
  if (!cachedResult) {
    result();
  } else {
    handlerPaint(cachedResult.results); //  important el .result porque es un array de objetos, y si no da error
  }
}
//4)Función par seleccionar hacer click en las series
function listenClickFavorites() {
  const liElement = document.querySelectorAll(".js-li");
  for (let i = 0; i < liElement.length; i++) {
    liElement[i].addEventListener("click", function (event) {
      handlerCheckFavorites(event, i); //Ponemos el parámetro i para llegar al indice en la función siquiente (5)
    });
  }
}
// 5) Función para quitar y poner el fondo y añadir las series clicadas a la array de objetos favoritos
function handlerCheckFavorites(evt, i) {
  let clicked = evt.currentTarget;
  clicked.classList.toggle("list-element");
  clicked.classList.toggle("list-element2");
  favoriteSeries.push({
    name: `${totalSeries[i].name}`,
    image: `${totalSeries[i].image} `,
  });
  paintFavorites(i);
}
//6) Función para pintar favoritos le ponemos el partámetro "i" para que sepa a qué nos referimos.
function paintFavorites(i) {
  let content2 = "";
  content2 += `<li class="js-li list-element"> <img class="img"  src="${favoriteSeries[i].image}"> ${favoriteSeries[i].name} </li>`;
  favorites.innerHTML += `<ul"> ${content2}</ul>`;
}

button.addEventListener("click", comprobationCache);
