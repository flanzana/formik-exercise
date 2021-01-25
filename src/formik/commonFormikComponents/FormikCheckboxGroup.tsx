import React from "react"
import { useField } from "formik"
import { ChoiceGroup } from "@kiwicom/orbit-components"
import FormikCheckbox from "./FormikCheckbox"
import { isTouchedAndNotSelected } from "../SportEquipmentForm/helpers"

type Props = {
  label: string
  name: string
  options: Array<{ label: string; value: string }>
}

// const toggleCheckboxArray = (field: any, valueToUpdate: string) => {
//   console.log({ field, valueToUpdate })
//   // Note: not possible to use because onChange expects string
//   return field.onChange({ ...field.value, [valueToUpdate]: !field.value[valueToUpdate] })
// }

// TODO validationSchema not working for group checkboxes (you can submit without checking anything)
const FormikCheckboxGroup = ({ label, name, options }: Props) => {
  const [field, meta] = useField(name)
  return (
    // @ts-ignore TODO
    <ChoiceGroup
      label={label}
      // onChange={ev => toggleCheckboxArray(field, ev.target.value)}
      error={isTouchedAndNotSelected(meta)}
    >
      {options.map(option => (
        <FormikCheckbox key={option.value} name={`${name}.${option.value}`} label={option.label} />
        // <Checkbox
        //   key={option.value}
        //   value={option.value}
        //   label={option.label}
        //   checked={field.value[option.value]}
        // />
      ))}
    </ChoiceGroup>
  )
}
export default FormikCheckboxGroup
