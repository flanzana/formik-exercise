import React from "react"
import { InputField } from "@kiwicom/orbit-components"
import { Controller, Path, UseControllerProps, UseControllerReturn, UseFormClearErrors } from "react-hook-form"

type Props<TFieldValues> = {
  label: string
  placeholder?: string
  clearErrors: UseFormClearErrors<TFieldValues>,
  controllerProps: UseControllerProps<TFieldValues, Path<TFieldValues>>,
}

function FormTextInputField<TFieldValues>({
  label,
  placeholder,
  clearErrors,
  controllerProps,
}: Props<TFieldValues>): React.ReactElement {
  return (
    <Controller
      {...controllerProps}
      render={({ field, formState }: UseControllerReturn<TFieldValues, Path<TFieldValues>>) => (
        <InputField
          label={label}
          type="text"
          name={field.name}
          // @ts-ignore
          value={field.value}
          onChange={ev => {
            clearErrors(field.name)
            field.onChange(ev)
          }}
          onBlur={field.onBlur}
          // @ts-ignore
          error={formState.errors[field.name]?.message}
          placeholder={placeholder}
        />
      )}
    />
  )
}

export default FormTextInputField
