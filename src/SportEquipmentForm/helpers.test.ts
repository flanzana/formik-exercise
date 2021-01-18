import {
  equipmentOptions,
  flightInitialValues,
  flightsOptions,
  getSelectedFlightsLabels,
  isTouchedAndNotSelected,
  passengerOptions,
} from "./helpers"

describe("helpers", () => {
  describe("Equipment selection", () => {
    it("equipmentOptions returns correct data for Orbit radio choice group", () => {
      expect(equipmentOptions).toEqual([
        { label: "Skis", value: "skis" },
        { label: "Surfboard", value: "surfboard" },
        { label: "Bike", value: "bike" },
        { label: "Other", value: "other" },
      ])
    })
  })
  describe("Passenger selection", () => {
    it("passengerOptions returns correct data for Orbit radio choice group", () => {
      expect(passengerOptions).toEqual([
        { label: "Janez Novak", value: "1" },
        { label: "Marija Novak", value: "2" },
        { label: "Ana Horvat", value: "3" },
      ])
    })
  })
  describe("Flights selection", () => {
    it("flightsOptions returns correct data for Orbit radio choice group", () => {
      expect(flightsOptions).toEqual([
        {
          label: "Ljubljana - Vienna",
          value: "0X0",
        },
        {
          label: "Vienna - Madrid",
          value: "1X0",
        },
        {
          label: "Madrid - Buenos Aires",
          value: "2X0",
        },
      ])
    })
    it("flightInitialValues returns correct data for Orbit radio choice group", () => {
      expect(flightInitialValues).toEqual({ "0X0": false, "1X0": false, "2X0": false })
    })
    describe("getSelectedFlightsLabels", () => {
      it("returns empty string if none selected", () => {
        expect(getSelectedFlightsLabels({ "0X0": false, "1X0": false, "2X0": false })).toEqual("")
      })
      it("returns one route if one selected", () => {
        expect(getSelectedFlightsLabels({ "0X0": false, "1X0": true, "2X0": false })).toEqual(
          "Vienna - Madrid",
        )
      })
      it("returns two routes if two selected", () => {
        expect(getSelectedFlightsLabels({ "0X0": false, "1X0": true, "2X0": true })).toEqual(
          "Vienna - Madrid, Madrid - Buenos Aires",
        )
      })
    })
    describe("isTouchedAndNotSelected", () => {
      it("returns error if touched and nothing selected", () => {
        expect(
          isTouchedAndNotSelected({
            value: { "0X0": false, "1X0": false, "2X0": false },
            touched: true,
          }),
        ).toEqual("Select at least 1 flight")
      })
      it("does not return error if not touched or something selected", () => {
        expect(
          isTouchedAndNotSelected({
            value: { "0X0": false, "1X0": false, "2X0": false },
            touched: false,
          }),
        ).toEqual(null)
        expect(
          isTouchedAndNotSelected({
            value: { "0X0": false, "1X0": true, "2X0": false },
            touched: false,
          }),
        ).toEqual(null)
        expect(
          isTouchedAndNotSelected({
            value: { "0X0": false, "1X0": true, "2X0": false },
            touched: true,
          }),
        ).toEqual(null)
      })
    })
  })
})
