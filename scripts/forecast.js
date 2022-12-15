// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const forecastTemp = document.querySelector('#forecastTemperature');



const url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Carlsbad&cnt=3&appid=258c71647178bd46025d18d5b01472a8';


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
    forecastTemp.innerHTML = `<strong>${weatherData.list.temp.day.toFixed(1)}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[1].icon}.png`;
    const desc = weatherData.weather[1].description;
  
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

const capitalize = (str) => {
    let strArr = str.split(" ");
    return strArr.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}