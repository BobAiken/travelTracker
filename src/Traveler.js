class Traveler {
  constructor(travelerData, userID){
    this.traveler = travelerData.filter(traveler => traveler.id === userID)
  }
  returnTravelerName(){
    return this.traveler.name
  }
  returnTravelerType(){
    return this.traveler.travelerType
  }
}