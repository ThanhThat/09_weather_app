// const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
  visibility: tam nhin
  wind.speed: toc do gio
  clouds.all: do am
 */
const inputElem = $(".input-search");

getWeather("ha noi");

inputElem.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    getWeather(e.target.value);
    inputElem.value = "";
  }
});

inputElem.addEventListener("blur", (e) => {
  if (e.target.value.trim()) {
    getWeather(e.target.value.trim());
    inputElem.value = "";
  }
});

function changWeatherUI(data) {
  // set background by temp
  if (Math.round(data.main.temp) >= 18) {
    $("body").classList.add("hot");
    $("body").classList.remove("cold");
  } else {
    $("body").classList.remove("hot");
    $("body").classList.add("cold");
  }

  $(".city").textContent = data.name;
  $(".country").textContent = data.sys.country;

  // time
  $(".time").textContent = new Date().toLocaleString();

  // nhiet do
  $(".temperature > .value").textContent = Math.round(data.main.temp);

  // mo ta
  $(".short-desc").textContent = data.weather[0].main;

  // tam nhin
  $(".visibility > span").textContent = data.visibility + " (m)";

  // toc do gio
  $(".wind > span").textContent = data.wind.speed + " (m/s)";

  // do am
  $(".cloud > span").textContent = data.clouds.all + " (%)";
}

async function getWeather(input) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`
    );
    const data = await res.json();

    changWeatherUI(data);
  } catch (err) {
    console.log(err);
  }
}
