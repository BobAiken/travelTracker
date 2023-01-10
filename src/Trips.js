class Trips {
  constructor(tripData, userID){
    this.trips = tripData.filter(trip => trip.userID === userID)
  }
}