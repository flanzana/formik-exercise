import React from "react";
import { useField } from "formik";
import { Checkbox, Stack, Text } from "@kiwicom/orbit-components";

type Props = {
  label: string;
  name: string;
}

const FormikCheckbox = ({ label, name }: Props) => {
  const [field, meta] = useField(name)
  return (
    <Stack spacing="extraTight">
      <Checkbox
        label={label}
        name={name}
        onChange={field.onChange}
        value={field.value}
        checked={field.value}
        hasError={Boolean(meta.error && meta.touched)}
      />
      {meta.error && meta.touched ? (
        <Text type="critical" size="small">
          {meta.error}
        </Text>
      ) : null}
    </Stack>
  )
}
export default FormikCheckbox