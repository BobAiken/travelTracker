class Traveler {
  constructor(travelerData, userID){
    this.traveler = travelerData.travelers.find(traveler => traveler.id === userID)
  }
}

export default Traveler