import React from "react"
import { useField } from "formik"
import { ChoiceGroup, Radio } from "@kiwicom/orbit-components"
import { displayError } from "./helpers"

type Props = {
  label: string
  name: string
  options: Array<{ label: string; value: string }>
}

const FormikRadioGroup = ({ label, name, options }: Props) => {
  const [field, meta] = useField(name)
  return (
    <ChoiceGroup
      label={label}
      onChange={field.onChange}
      error={displayError(meta.error, meta.touched)}
    >
      {options.map(option => (
        <Radio
          key={option.value}
          name={name}
          label={option.label}
          value={option.value}
          checked={option.value === field.value}
          onChange={field.onChange}
        />
      ))}
    </ChoiceGroup>
  )
}
export default FormikRadioGroup
