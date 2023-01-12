class Trip {
  constructor(tripData, userID, destinationData){
    this.trips = tripData.trips.filter(trip => trip.userID === userID)
    this.destinations = this.trips.reduce((finalList,trip)=>{
      destinationData.destinations.forEach(destination => {
        if(destination.id === trip.destinationID){
          finalList.push(destination)
        }
      })
      return finalList
    },[])
  }
  
  calculateTotalTripCost(){
    let totalCost = this.trips.reduce((finalNumber,trip)=>{
      this.destinations.forEach(destination=>{
        if(destination.id === trip.destinationID){
          finalNumber += ((trip.travelers * destination.estimatedFlightCostPerPerson) + (trip.duration * destination.estimatedLodgingCostPerDay)) * 1.1
        }
      })
      return finalNumber
    },0)
    return new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    }).format(totalCost)
  }

  calculateSingleTripCost(index){
    let cost = ((this.trips[index].travelers * this.destinations[index].estimatedFlightCostPerPerson) + (this.trips[index].duration * this.destinations[index].estimatedLodgingCostPerDay)) * 1.1
    return new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    }).format(cost)
  }
}

export default Trip