import chai, { expect } from 'chai';
import Trip from "../src/Trips"

describe("Trips", () => {
  let userTrips

  beforeEach(()=>{
    let tripData = {
      trips:[
        {
          id: 89,
          userID: 2,
          destinationID: 10,
          travelers: 5,
          date: "2019/09/27",
          duration: 13,
          status: "approved",
          suggestedActivities: [ ]
        },
        {
          id: 100,
          userID: 2,
          destinationID: 6,
          travelers: 6,
          date: "2020/3/28",
          duration: 10,
          status: "approved",
          suggestedActivities: [ ]
        },
        {
          id: 65,
          userID: 3,
          destinationID: 35,
          travelers: 4,
          date: "2020/03/21",
          duration: 18,
          status: "approved",
          suggestedActivities: [ ]
        }
      ],
    }

    let destinationData = {
      destinations: [
        {
          id: 6,
          destination: "Jakarta, Indonesia",
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 890,
          image: "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          alt: "lit up city at night"
          },
          {
          id: 7,
          destination: "Paris, France",
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 395,
          image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
          alt: "city during the day time with eiffel tower"
          },
          {
          id: 8,
          destination: "Tokyo, Japan",
          estimatedLodgingCostPerDay: 125,
          estimatedFlightCostPerPerson: 1000,
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
          alt: "city with people walking in crosswalk and brightly lit shops at night"
          },
          {
          id: 9,
          destination: "Amsterdam, Netherlands",
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 950,
          image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          alt: "canal with boats and trees and buildings along the side"
          },
          {
          id: 10,
          destination: "Toronto, Canada",
          estimatedLodgingCostPerDay: 90,
          estimatedFlightCostPerPerson: 450,
          image: "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
          },
      ],
    }

    userTrips = new Trip(tripData, 2, destinationData)
  });

  it("should be a function", function(){
    expect(Trip).to.be.a("function")
  })

  it("should be an instance of Trip",function(){
    expect(userTrips).to.be.an.instanceOf(Trip)
  })

  it("should have a list of trips taken by the user",function(){
    expect(userTrips.trips).to.deep.equal([{
      id: 89,
      userID: 2,
      destinationID: 10,
      travelers: 5,
      date: "2019/09/27",
      duration: 13,
      status: "approved",
      suggestedActivities: [ ]
    },
    {
      id: 100,
      userID: 2,
      destinationID: 6,
      travelers: 6,
      date: "2020/3/28",
      duration: 10,
      status: "approved",
      suggestedActivities: [ ]
    }])
  })

  it("should store all destinationData",function(){
    expect(userTrips.destinationData).to.deep.equal({destinations: [
      {
        id: 6,
        destination: "Jakarta, Indonesia",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 890,
        image: "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "lit up city at night"
        },
        {
        id: 7,
        destination: "Paris, France",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 395,
        image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
        alt: "city during the day time with eiffel tower"
        },
        {
        id: 8,
        destination: "Tokyo, Japan",
        estimatedLodgingCostPerDay: 125,
        estimatedFlightCostPerPerson: 1000,
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
        alt: "city with people walking in crosswalk and brightly lit shops at night"
        },
        {
        id: 9,
        destination: "Amsterdam, Netherlands",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 950,
        image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "canal with boats and trees and buildings along the side"
        },
        {
        id: 10,
        destination: "Toronto, Canada",
        estimatedLodgingCostPerDay: 90,
        estimatedFlightCostPerPerson: 450,
        image: "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
        },
    ],})
  })

  it("should store all destinations the user has/will take a trip to",function(){
    expect(userTrips.destinations).to.deep.equal([ 
      {
        id: 10,
        destination: "Toronto, Canada",
        estimatedLodgingCostPerDay: 90,
        estimatedFlightCostPerPerson: 450,
        image: "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
      },
      {
        id: 6,
        destination: "Jakarta, Indonesia",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 890,
        image: "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "lit up city at night"
      }
    ])
  })

  it("should be able to calculate the total cost of all trips",function(){
    expect(userTrips.calculateTotalTripCost()).to.equal("$10,406.00")
  })

  it("should be able to calculate the cost of one trip",function(){
    expect(userTrips.calculateSingleTripCost(5,13,10)).to.equal("$3,762.00")
  })

})

