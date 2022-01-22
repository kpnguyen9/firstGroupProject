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
  console.dir(data);
  return data;
};

const extractParkData = (data) => {
  // console.dir(data.data);
  return data.data;
};

const printParkName = (parks) => {
  parks.map((park) => {
    const parkImage = park.images[0].url;

    const parkCard = `
    <img class="card-img-top" src=${parkImage} alt="Card image cap">
    <div class="card-body">
    <a class="btn btn-primary parkButton" id="${park.parkCode}" name="${park.latitude},${park.longitude}">${park.fullName}</a>
    </div>
    </div>`;

    const parkInfo = document.getElementById("parkInfo");
    const createDiv = document.createElement("div");
    createDiv.classList.add("card");
    createDiv.classList.add("parkCard");
    createDiv.style.width = "18rem";
    createDiv.style.height = "18rem";
    createDiv.innerHTML = parkCard;
    parkInfo.appendChild(createDiv);

    const scrollToParkCards = document.getElementById("parkInfo");
    scrollToParkCards.scrollIntoView();
  });
};

const reportError = () => {
  console.log("Error with fetching parks based on what the user submitted");
};

//click event for submit button after user inputs park name

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
  const parkInfo = document.getElementById("parkInfo");
  parkInfo.innerHTML = "";

  let parkName = parkInput.value;
  let parkURL = `https://developer.nps.gov/api/v1/parks?q=${parkName}&api_key=${campKey}`;

  fetch(parkURL)
    .then((response) => response.json())
    // .then(logData)
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

    let campCard = `
<div class="card-body">
  <h5 class="card-title">${camp.name}</h5>
  <p class="card-text">${camp.description}</p>
</div>

<ul class="list-group list-group-flush">
<li class="list-group-item">Reservation Info: ${camp.reservationInfo}</li>
</ul>

  <div class="card-body">
    <a href="${camp.reservationUrl}" class="card-link" target="_blank">Book a Reservation here</a>
  </div>
</ul>
`;

    const createDiv = document.createElement("div");
    createDiv.classList.add("card");
    createDiv.style.width = "50rem";
    createDiv.innerHTML = campCard;

    campContainer.appendChild(createDiv);

    const scrollToCampCards = document.getElementById("weatherContainer");
    scrollToCampCards.scrollIntoView();
  });
};

const extractCurrentWeather = (data) => {
  // console.dir(data.current);
  return data.current;
};

const printCurrentWeather = (current) => {
  const weatherContainer = document.getElementById("weatherContainer");

  let newLink = "https:" + `${current.condition.icon}`;
  // console.log(newLink);

  let currentWeather = `
<div class="card" style="width: 18rem;">
  <div class="card-header">
  <img src=${newLink} alt="conditionIcon"> ${current.condition.text}
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Today's weather was last updated ${current.last_updated}</li>
    <li class="list-group-item">Temperature: ${current.temp_f}F</li>
    <li class="list-group-item">Wind Speed: ${current.wind_mph}mph</li>
    <li class="list-group-item">Precipitation(inches): ${current.precip_in}</li>
    <li class="list-group-item">Humidity: ${current.humidity}%</li>
  </ul>
</div>`;

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
      // .then(logData)
      .then(extractCurrentWeather)
      .then(printCurrentWeather);
  }
});
