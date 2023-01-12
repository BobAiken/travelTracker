//imports
import returnDataPromises from './apiCalls';
import './css/styles.css';
import Traveler from './Traveler';
import Trip from './Trips';

//querySelectors

let travelLog = document.querySelector(".travel-log")
let financeLog = document.querySelector(".finance-log")
let welcomeMessage = document.querySelector(".welcome-message")

//globalVariables
let currentUser
let travelerData
let tripsData
let destinationsData
let index
let traveler;
let travelerTrips

//functions

function generateRandomIndex() {
  index = Math.floor(Math.random() * travelerData.travelers.length);
}

function fetchApiCalls() {
  returnDataPromises().then(data => {
    travelerData = data[0]
    tripsData = data[1]
    destinationsData = data[2]
    generateRandomIndex()
    loadHandler()
  })
}

function loadHandler() {
  instantiateClasses()
  displayWelcomeMessage()
  displayTravelLog()
  displayFinanceLog()
}

function instantiateClasses() {
  traveler = new Traveler(travelerData,index)
  travelerTrips = new Trip(tripsData,index,destinationsData)
}

function displayWelcomeMessage(){
  welcomeMessage.innerText = `${traveler.traveler.name}`
}

function displayTravelLog() {
  travelerTrips.trips.forEach((trip,index) => {
    travelLog.innerHTML += `
    <section class="travel-card">
    <article class=travel-card-info>
      <p>Location: ${travelerTrips.destinations[index].destination}</p>
      <p>Travelers: ${trip.travelers}</p>
      <p>Date: ${trip.date}</p>
      <p>Duration: ${trip.duration} days</p>
      <p>Cost: ${travelerTrips.calculateSingleTripCost(index)}</p>
      <p>Status: ${trip.status}</p>
    </article>
    <div class="image-container">
      <img src=${travelerTrips.destinations[index].image} alt=${travelerTrips.destinations[index].alt}>
    </div>
    </section>
    `
  })
}

function displayFinanceLog() {
  financeLog.innerText = `Total Money Spent: ${travelerTrips.calculateTotalTripCost()}`
}

//eventListeners

window.addEventListener("load", () => {
  fetchApiCalls()
});





