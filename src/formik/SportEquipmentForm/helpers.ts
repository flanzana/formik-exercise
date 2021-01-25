import * as Yup from "yup"

export const EQUIPMENT_DATA = {
  skis: "Skis",
  surfboard: "Surfboard",
  bike: "Bike",
  other: "Other",
}
export const equipmentOptions = Object.keys(EQUIPMENT_DATA).map(value => ({
  // @ts-ignore TODO fix ts error and remove comment
  label: EQUIPMENT_DATA[value],
  value,
}))
// @ts-ignore TODO fix ts error and remove comment
export const getEquipmentLabel = (value: string) => EQUIPMENT_DATA[value] || ""

export const PASSENGERS_DATA = {
  1: "Janez Novak",
  2: "Marija Novak",
  3: "Ana Horvat",
}
export const passengerOptions = Object.keys(PASSENGERS_DATA).map(value => ({
  // @ts-ignore TODO fix ts error and remove comment
  label: PASSENGERS_DATA[value],
  value,
}))
// @ts-ignore TODO fix ts error and remove comment
export const getPassengerName = (value: string) => PASSENGERS_DATA[value] || ""

export const FLIGHTS_DATA = {
  "0X0": "Ljubljana - Vienna",
  "1X0": "Vienna - Madrid",
  "2X0": "Madrid - Buenos Aires",
}
export const flightsOptions = Object.keys(FLIGHTS_DATA).map(value => ({
  // @ts-ignore TODO fix ts error and remove comment
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
// @ts-ignore TODO fix ts error and remove comment
export const getSelectedFlightsLabels = (value: { [flightId: string]: boolean }): string => {
  // @ts-ignore TODO fix ts error and remove comment
  const flightLabels: string[] = Object.keys(value).reduce((arr, fl) => {
    const isTrue = value[fl]
    // @ts-ignore TODO fix ts error and remove comment
    return isTrue ? [...arr, FLIGHTS_DATA[fl]] : arr
  }, [])

  return flightLabels.length ? flightLabels.join(", ") : ""
}

export const isTouchedAndNotSelected = (meta: {
  touched: boolean
  value: { [flightId: string]: boolean }
}): string | null => {
  const isSomeSelected = Object.values(meta.value).some(Boolean)
  if (meta.touched && !isSomeSelected) {
    return "Select at least 1 flight"
  }
  return null
}

export const sportEquipmentValidationSchema = Yup.object({
  equipmentType: Yup.string()
    .oneOf(Object.keys(EQUIPMENT_DATA), "Invalid equipment type")
    .required("Required equipment type"),
  passenger: Yup.string()
    .oneOf(Object.keys(PASSENGERS_DATA), "Invalid passenger")
    .required("Required passenger"),
  length: Yup.number()
    .min(1, "Must be 1 cm or more")
    .max(200, "Must be 2 meters or less")
    .required("Required length"),
  width: Yup.number()
    .min(1, "Must be 1 cm or more")
    .max(200, "Must be 2 meters or less")
    .required("Required width"),
  height: Yup.number()
    .min(1, "Must be 1 cm or more")
    .max(200, "Must be 2 meters or less")
    .required("Required height"),
  weight: Yup.number()
    .positive("Must be more than 0 kg")
    // .min(1, "Must be 1 cm or more")
    .max(100, "Must be 100 kg or less")
    .required("Required weight"),
  flights: Yup.object().required("Select at least 1 flight"), // TODO validate if something selected or not
  terms: Yup.boolean()
    .required("You must accept the terms and conditions.")
    .oneOf([true], "You must accept the terms and conditions."),
})
