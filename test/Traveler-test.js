import chai, { expect } from "chai";
import Traveler from "../src/Traveler";

describe("Traveler", () => {
  let userTraveler;

  beforeEach(() => {
    let travelerData = {
      travelers: [
        {
          id: 1,
          name: "Ham Leadbeater",
          travelerType: "relaxer",
        },
        {
          id: 2,
          name: "Rachael Vaughten",
          travelerType: "thrill-seeker",
        },
        {
          id: 3,
          name: "Sibby Dawidowitsch",
          travelerType: "shopper",
        },
      ],
    };

    userTraveler = new Traveler(travelerData, 2);
  });

  it("should be a function", function () {
    expect(Traveler).to.be.a("function");
  });

  it("should be an instance of Traveler", function () {
    expect(userTraveler).to.be.an.instanceOf(Traveler);
  });

  it("should have a traveler", function () {
    expect(userTraveler.traveler).to.deep.equal({
      id: 2,
      name: "Rachael Vaughten",
      travelerType: "thrill-seeker",
    });
  });
});
