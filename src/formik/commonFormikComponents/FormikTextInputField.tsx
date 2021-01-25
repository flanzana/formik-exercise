import React from "react"
import { useField } from "formik"
import { InputField } from "@kiwicom/orbit-components"
import { displayError } from "./helpers"

type Props = {
  label: string
  name: string
  placeholder?: string
}

const FormikTextInputField = ({ label, name, placeholder }: Props) => {
  const [field, meta] = useField(name)
  return (
    <InputField
      label={label}
      name={name}
      type="text"
      value={field.value}
      onChange={field.onChange}
      onBlur={ev => field.onBlur(ev)}
      error={displayError(meta.error, meta.touched)}
      placeholder={placeholder}
    />
  )
}
export default FormikTextInputField
