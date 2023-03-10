class Trip {
  constructor(tripData, userID, destinationData) {
    this.trips = tripData.trips
      .filter((trip) => trip.userID === userID)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    this.destinationData = destinationData;
    this.destinations = this.trips.reduce((finalList, trip) => {
      destinationData.destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          finalList.push(destination);
        }
      });
      return finalList;
    }, []);
  }

  calculateTotalTripCost() {
    let totalCost = this.trips.reduce((finalNumber, trip) => {
      this.destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          finalNumber +=
            (trip.travelers * destination.estimatedFlightCostPerPerson +
              trip.duration * destination.estimatedLodgingCostPerDay) *
            1.1;
        }
      });
      return finalNumber;
    }, 0);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalCost);
  }

  calculateSingleTripCost(travelers, duration, destinationID) {
    let selectedDestination = this.destinationData.destinations.find(
      (destination) => destination.id == destinationID
    );
    if (!selectedDestination) {
      return "Invalid destination";
    }
    let cost =
      (travelers * selectedDestination.estimatedFlightCostPerPerson +
        duration * selectedDestination.estimatedLodgingCostPerDay) *
      1.1;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cost);
  }
}

export default Trip;
