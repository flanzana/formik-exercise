import React from "react"
import { InputField } from "@kiwicom/orbit-components"
import {
  Controller,
  Control,
  FieldName,
  FieldErrors,
  RegisterOptions,
  FieldValues,
} from "react-hook-form"

type Props = {
  label: string
  name: string
  placeholder?: string
  control: Control
  rules?: RegisterOptions
  clearErrors: (name: FieldName<FieldValues>) => void
  errors: FieldErrors
}

const FormTextInputField = ({
  label,
  name,
  placeholder,
  control,
  rules,
  clearErrors,
  errors,
}: Props): React.ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={props => (
        <InputField
          label={label}
          type="text"
          name={name}
          value={props.value}
          onChange={ev => {
            clearErrors(name)
            props.onChange(ev)
          }}
          onBlur={props.onBlur}
          error={errors[name]?.message}
          placeholder={placeholder}
        />
      )}
    />
  )
}
export default FormTextInputField
