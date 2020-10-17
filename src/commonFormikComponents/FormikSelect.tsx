import React from "react";
import { useField } from "formik";
import { Select } from "@kiwicom/orbit-components";
import { displayError } from "./helpers";

type Props = {
  label: string;
  name: string;
  options: Array<{ label: string, value: string }>;
  placeholder: string;
}

const FormikSelect = ({ label, name, options, placeholder }: Props) => {
  const [field, meta] = useField(name)
  return (
    <Select
      label={label}
      name={name}
      value={field.value}
      onChange={field.onChange}
      onBlur={ev => field.onBlur(ev)}
      options={options}
      error={displayError(meta.error, meta.touched)}
      placeholder={placeholder}
    />
  )
}
export default FormikSelect