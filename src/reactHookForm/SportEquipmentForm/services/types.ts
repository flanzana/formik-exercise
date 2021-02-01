export type EquipmentCategory = "skis" | "surfboard" | "bike" | "other"

export type PassengerId = string

export type FlightId = string

export type FlightsType = { [key: string]: boolean }

export interface SportEquipmentValues {
  equipmentType: EquipmentCategory
  passenger: PassengerId
  length: number
  width: number
  height: number
  weight: number
  flights: FlightsType
  terms: boolean
}
