//imports
import returnDataPromises from './apiCalls';
import './css/styles.css';
import Traveler from './Traveler';
import Trip from './Trips';

//querySelectors

let travelLog = document.querySelector(".travel-log")
let financeLog = document.querySelector(".finance-log")
let welcomeMessage = document.querySelector(".welcome-message")
let formDestination = document.querySelector("#form-destination")
let formDate = document.querySelector("#form-date")
let formDuration = document.querySelector("#form-duration")
let formTravelers = document.querySelector("#form-travelers")
let formSubmit = document.querySelector("form-submit")
let travelPlanner = document.querySelector(".form")
let costEstimation = document.querySelector("#cost-estimation")
let username = document.querySelector("#username")
let password = document.querySelector("#password")
let loginButton = document.querySelector("#loginSubmit")
let loginForm = document.querySelector(".login-holder")
let loginMessage = document.querySelector(".login-message")
let loginScreen = document.querySelector(".log-in")
let mainPage = document.querySelector(".main-page")

//globalVariables
let travelerData
let tripsData
let destinationsData
let userID
let traveler;
let travelerTrips

//functions

function generateRandomUserID() {
  if(!userID) {
    userID = Math.floor(Math.random() * travelerData.travelers.length) + 1;
  }
}

function fetchApiCalls() {
  console.log("inside fetchAPICalls")
  returnDataPromises().then(data => {
    travelerData = data[0]
    tripsData = data[1]
    destinationsData = data[2]
    console.log("inside returnDataPromises")
    loadHandler()
  })
}

function loadHandler() {
  generateRandomUserID()
  instantiateClasses()
  createDestinationSelectList()
  displayWelcomeMessage()
  displayTravelLog()
  displayFinanceLog()
}

function instantiateClasses() {
  traveler = new Traveler(travelerData,userID)
  travelerTrips = new Trip(tripsData,userID,destinationsData)
}

function displayWelcomeMessage(){
  welcomeMessage.innerText = `${traveler.traveler.name}`
}

function createDestinationSelectList(){
  formDestination.innerHTML = ""
  destinationsData.destinations.forEach(destination => {
    formDestination.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
  })
}

function displayTravelLog() {
  travelLog.innerHTML = ""
  travelerTrips.trips.forEach((trip,index) => {
    travelLog.innerHTML += `
    <section class="travel-card">
    <article class=travel-card-info>
      <p>Location: ${travelerTrips.destinations[index].destination}</p>
      <p>Travelers: ${trip.travelers}</p>
      <p>Date: ${new Date(trip.date).toDateString()}</p>
      <p>Duration: ${trip.duration} days</p>
      <p>Cost: ${travelerTrips.calculateSingleTripCost(trip.travelers,trip.duration,trip.destinationID)}</p>
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

function displayEstimatedCost(){
  console.log(formDate.value)
  if(formDuration.value && formTravelers.value){
    costEstimation.innerText = `${travelerTrips.calculateSingleTripCost(formTravelers.value,formDuration.value,formDestination.value)} includes 10% Travel Agent Fee`
  } else {
    costEstimation.innerText = ""
  }
}
function formatFormData(){
  console.log(formDestination.value)
  return {
    id: Number(tripsData.trips.length+1), 
    userID: Number(traveler.traveler.id), 
    destinationID: Number(formDestination.value),
    travelers: Number(formTravelers.value), 
    date: formDate.value.replaceAll("-","/"), 
    duration: Number(formDuration.value), 
    status: 'pending', 
    suggestedActivities: []
  }
}

function postTripRequest(){
  const postData = formatFormData()
  fetch('http://localhost:3001/api/v1/trips', {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    if(response.ok){
      return response.json()
    } else {
      throw new Error("Something went wrong with the server!")
    }
  })
  .then(travelPlanner.reset())
  .then(setTimeout(fetchApiCalls,1000))
  .catch(error => {
    console.error(error.message)
    costEstimation.innerText = "Failed to get data"
  })
}

function checkLoginCredentials(){
  let formattedUsername = username.value.slice(0,8)
  let usernameID
  if(username.value.length === 10){
    usernameID = Number(username.value.slice(-2))
  } else if(username.value.length === 9){
    usernameID = Number(username.value.slice(-1))
  } else {
    usernameID = -1
  }
  console.log(formattedUsername)
  console.log(usernameID)
  if(password.value === "travel" && formattedUsername === "traveler" && usernameID <= 50 && usernameID > 0){
    userID = usernameID
    fetchApiCalls()
    loginScreen.classList.toggle("hide")
    mainPage.classList.toggle("hide")
  } else {
    loginForm.reset()
    loginMessage.innerText = "Your username or password was incorrect!"
  }
}


//eventListeners

travelPlanner.addEventListener("submit",(e)=>{
  e.preventDefault()
  postTripRequest()
})

travelPlanner.addEventListener("input",()=>{
  displayEstimatedCost()
})

loginButton.addEventListener("click",()=>{
  checkLoginCredentials()
})