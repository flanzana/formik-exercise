import { EquipmentCategory, FlightsType, PassengerId, FlightId } from "./types"

export const EQUIPMENT_DATA = {
  skis: "Skis",
  surfboard: "Surfboard",
  bike: "Bike",
  other: "Other",
} as const

export const equipmentOptions = (Object.keys(EQUIPMENT_DATA) as EquipmentCategory[]).map(value => ({
  label: EQUIPMENT_DATA[value],
  value,
}))

export const getEquipmentLabel = (value: EquipmentCategory): string => EQUIPMENT_DATA[value] || ""

export const PASSENGERS_DATA: { [key: string]: string } = {
  1: "Janez Novak",
  2: "Marija Novak",
  3: "Ana Horvat",
}

export const passengerOptions = (Object.keys(PASSENGERS_DATA) as PassengerId[]).map(value => ({
  label: PASSENGERS_DATA[value],
  value,
}))

export const getPassengerName = (value: PassengerId): string => PASSENGERS_DATA[value] || ""

export const FLIGHTS_DATA: { [key: string]: string } = {
  "0X0": "Ljubljana - Vienna",
  "1X0": "Vienna - Madrid",
  "2X0": "Madrid - Buenos Aires",
}
export const flightsOptions = (Object.keys(FLIGHTS_DATA) as FlightId[]).map(value => ({
  label: FLIGHTS_DATA[value],
  value,
}))

export const flightInitialValues = Object.keys(FLIGHTS_DATA).reduce(
  (arr, flight) => ({
    ...arr,
    [flight]: false,
  }),
  {},
)

export const getSelectedFlightsLabels = (value: FlightsType): string => {
  if (!value) return ""

  const flightLabels: string[] = Object.keys(value).reduce((arr: string[], fl: FlightId) => {
    const isTrue = value[fl]
    return isTrue ? [...arr, FLIGHTS_DATA[fl]] : arr
  }, [])

  return flightLabels.length ? flightLabels.join(", ") : ""
}
