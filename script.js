//input name of park
//fetch list of parks that have input value
//use latLong and parkCode
//fetch weather using latLong
//fetch list of campgrounds using parkCode

//campsite and weather API keys

const campKey = "7PL6BHm48y6uF19epOerVmeMwRXdF1SwF6pXNcRJ";
const weatherKey = "be5d69f382674f0ba28171308221501";

const parkInput = document.getElementById("parkNameInput");

//_________________________________________________________________

const logData = (data) => {
  // console.dir(data);
  return data;
};

const extractParkData = (data) => {
  // console.dir(data.data);
  return data.data;
};

const printParkName = (parks) => {
  parks.map((park) => {
    const createLi = document.createElement("li");
    createLi.classList.add("parkListItem");

    const createButton = document.createElement("BUTTON");
    createButton.innerHTML = `${park.fullName}`;
    createButton.classList.add("parkButton");
    createLi.appendChild(createButton);
    createButton.id = park.parkCode;
    createButton.setAttribute("name", `${park.latitude},${park.longitude}`);

    const parkList = document.getElementById("parkList");
    parkList.appendChild(createLi);
  });
};

const reportError = () => {
  console.log("Error with fetching parks based on what the user submitted");
};

//click event for submit button after user inputs park name

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
  const parkList = document.getElementById("parkList");
  parkList.innerHTML = "";

  let parkName = parkInput.value;
  let parkURL = `https://developer.nps.gov/api/v1/parks?q=${parkName}&api_key=${campKey}`;

  fetch(parkURL)
    .then((response) => response.json())
    .then(logData)
    .then(extractParkData)
    .catch(reportError)
    .then(printParkName);

  parkInput.value = "";
});

const printCampsites = (camps) => {
  const campContainer = document.getElementById("campContainer");
  campContainer.innerHTML = "";

  camps.map((camp) => {
    // console.log(camp.name);

    const createLi = document.createElement("li");
    createLi.innerHTML = `${camp.name}`;

    campContainer.appendChild(createLi);
  });
};

const extractCurrentWeather = (data) => {
  console.dir(data.current);
  return data.current;
};

const printCurrentWeather = (current) => {
  const weatherContainer = document.getElementById("weatherContainer");

  let newLink = "https:" + `${current.condition.icon}`;
  console.log(newLink);

  let currentWeather = `
  <img src=${newLink} alt="conditionIcon">
  <ul>
  <li>Today's weather was last updated ${current.last_updated}</li>
  <li>Condition: ${current.condition.text}</li>
  <li>Temperature: ${current.temp_f}F</li>
  <li>Wind Speed: ${current.wind_mph}mph</li>
  <li>Precipitation(inches): ${current.precip_in}</li>
  <li>Humidity: ${current.humidity}%</li>
  </ul>`;

  weatherContainer.innerHTML = currentWeather;
};
//extract the parkCode and fetch campground based off parkCode
//print campsites and weather forecast after clicking park button

parkInfo.addEventListener("click", (event) => {
  // console.log("parkInfo div was clicked");

  if (event.target.className.includes("parkButton")) {
    // console.log("parkButton was clicked");

    let parkCode = event.target.id;
    // console.log(parkCode);
    let latLong = `${event.target.name}`;
    // console.log(latLong);

    let parkURL = `https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&api_key=${campKey}`;

    let weatherCurrentURL = `http://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${latLong}&aqi=no`;

    let weatherForecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${latLong}&days=7&aqi=no&alerts=no`;

    // console.log(weatherCurrentURL);
    // console.log(weatherForecastURL);

    fetch(parkURL)
      .then((response) => response.json())
      .then(logData)
      .then(extractParkData)
      .then(printCampsites);

    fetch(weatherForecastURL)
      .then((response) => response.json())
      .then(extractCurrentWeather)
      .then(printCurrentWeather);
  }
});

// {
//   "last_updated_epoch": 1642697100,
//   "last_updated": "2022-01-20 10:45",
//   "temp_c": -0.5,
//   "temp_f": 31.1,
//   "is_day": 1,
//   "condition": {
//       "text": "Sunny",
//       "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
//       "code": 1000
//   },
//   "wind_mph": 12.5,
//   "wind_kph": 20.2,
//   "wind_degree": 31,
//   "wind_dir": "NNE",
//   "pressure_mb": 1031,
//   "pressure_in": 30.45,
//   "precip_mm": 0,
//   "precip_in": 0,
//   "humidity": 40,
//   "cloud": 18,
//   "feelslike_c": -5.9,
//   "feelslike_f": 21.4,
//   "vis_km": 10,
//   "vis_miles": 6,
//   "uv": 2,
//   "gust_mph": 17,
//   "gust_kph": 27.4
// }
