import { fetchApiCalls, travelPlanner, costEstimation } from "./scripts";

function fetchData(dataset) {
  return fetch(`http://localhost:3001/api/v1/${dataset}`)
    .then((response) => response.json())
    .catch((error) => console.log(`${dataset}`, error));
}

function postTripRequest(postData) {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong with the server!");
      }
    })
    .then(travelPlanner.reset())
    .then(setTimeout(fetchApiCalls, 1000))
    .catch((error) => {
      console.error(error.message);
      costEstimation.innerText = "Failed to get data";
    });
}

function returnDataPromises() {
  const fetchTravelers = fetchData("travelers");
  const fetchTrips = fetchData("trips");
  const fetchDestinations = fetchData("destinations");

  return Promise.all([fetchTravelers, fetchTrips, fetchDestinations]);
}

export { postTripRequest, returnDataPromises };
