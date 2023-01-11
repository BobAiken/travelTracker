function fetchData(dataset) {
  return fetch(`http://localhost:3001/api/v1/${dataset}`).then(response => response.json()).catch(error => console.log(`${dataset}`, error))
}

export default function returnDataPromises(){
  const fetchTravelers = fetchData("travelers")
  const fetchTrips = fetchData("trips")
  const fetchDestinations = fetchData("destinations")

  return Promise.all([fetchTravelers,fetchTrips,fetchDestinations])
}