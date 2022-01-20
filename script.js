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
  console.log(
    "Error with fetching parks based on user what the user submitted"
  );
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
});

//next...extract the parkCode and fetch campground based off parkCode

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

    console.log(weatherCurrentURL);
    console.log(weatherForecastURL);

    fetch(parkURL)
      .then((response) => response.json())
      .then(logData)
      .then(extractParkData)
      .then(printCampsites);

    fetch(weatherForecastURL)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
});

//also...extract latLong and fetch weather forecast based off latLong
