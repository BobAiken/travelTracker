class Trip {
  constructor(tripData, userID, destinationData){
    this.trips = tripData.trips.filter(trip => trip.userID === userID)
    this.destinations = destinationData.destinations.reduce((finalList,destination)=>{
      this.trips.forEach(trip=>{
        if(destination.id === trip.destinationID){
          finalList.push(destination)
        }
      })
      return finalList
    },[])
  }
  
  calculateTotalTripCost(){
    return this.trips.reduce((finalNumber,trip)=>{
      this.destinations.forEach(destination=>{
        if(destination.id === trip.destinationID){
          finalNumber += (trip.travelers * destination.estimatedFlightCostPerPerson) + (trip.duration * destination.estimatedLodgingCostPerDay)
        }
      })
      return finalNumber
    },0) * 1.1
  }
}

export default Trip