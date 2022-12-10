// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const wind = document.querySelector('#wind');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');


const url = 'https://api.openweathermap.org/data/2.5/weather?q=Arequipa&units=metric&appid=9a104914144805bb3d67fe040fcc2fc8';


async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}
apiFetch();
    
function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
    wind.innerHTML = `<strong>${weatherData.wind.speed.toFixed(2)}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
  
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

const capitalize = (str) => {
    let strArr = str.split(" ");
    return strArr.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}