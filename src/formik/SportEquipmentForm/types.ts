export interface SportEquipmentValues {
  equipmentType: string
  passenger: string
  length: string
  width: string
  height: string
  weight: string
  flights: { [key: string]: boolean }
  terms: boolean
}

export interface SportEquipmentErrors {
  equipmentType: string
  passenger: string
  length: string
  width: string
  height: string
  weight: string
  flights: string
  terms: boolean
}

export type SportEquipmentFieldNames =
  | "equipmentType"
  | "passenger"
  | "length"
  | "width"
  | "height"
  | "weight"
  | "flights"
  | "terms"
