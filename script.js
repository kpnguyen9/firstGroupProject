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
  //   console.dir(data);
  return data;
};

const extractParkData = (data) => {
  //   console.dir(data.data);
  return data.data;
};

const printParkName = (parks) => {
  parks.map((park) => {
    const createLi = document.createElement("li");

    const createButton = document.createElement("BUTTON");
    createButton.innerHTML = `${park.fullName}`;
    createButton.classList.add("parkButton");
    createLi.appendChild(createButton);

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
    .then(extractParkData)
    .catch(reportError)
    .then(printParkName);
});

//next...extract the parkCode and fetch campground based off parkCode

//also...extract latLong and fetch weather forecast based off latLong
