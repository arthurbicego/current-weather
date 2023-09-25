const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-location");

const sectionWeatherInfo = document.querySelector("#weather-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("submeteu");

  if (!input || !sectionWeatherInfo) return;

  const location = input.value;

  if (location.length < 3) {
    alert("O local precisa ter pelo menos 3 letras.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6223eaf81d36a95117b1cb78cb95704c&lang=pt_br&units=metric`
    );

    const data = await response.json();

    const infos = {
      temperature: Math.round(data.main.temp),
      local: data.name,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    sectionWeatherInfo.innerHTML = `
    <div class="weather-data">
    <h2>${infos.local}</h2>
    <span>${infos.temperature}°C</span>
    </div>
    <img src="${infos.icon}">`;
  } catch (error) {
    console.log("Error to return API data.");
  }
});
