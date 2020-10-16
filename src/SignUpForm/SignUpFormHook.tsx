import React, { useState } from "react"
import { FormikHelpers, useFormik } from "formik"
import {
  Stack,
  Button,
  InputField,
  Checkbox,
  Select,
  Text,
  Alert
} from "@kiwicom/orbit-components"
import { signUpValidate, displayError } from "./helpers"
import { SignUpFormValues } from "./types";

export default function SignUpFormHook() {
  const [submittedValues, setSubmittedValues] = useState("")

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      terms: false,
      jobType: ""
    },
    validate: signUpValidate, // TODO create validationSchema instead of validate
    onSubmit: async (values: SignUpFormValues, { resetForm }: FormikHelpers<SignUpFormValues>) => {
      await new Promise((r) => setTimeout(r, 1000))
      // setStatus("success") // resetForm will reset status as well, so cannot use formik.status for showing success alert
      setSubmittedValues(JSON.stringify(formik.values, null, 2))
      resetForm()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="loose">
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          error={displayError(
            formik.errors.firstName,
            formik.touched.firstName
          )}
          // {...formik.getFieldProps("firstName")} // onChange, onBlur, value, checked (typescript errors!!)
          onChange={formik.handleChange}
          onBlur={ev => formik.handleBlur(ev)}
          value={formik.values.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={ev => formik.handleBlur(ev)}
          value={formik.values.lastName}
          error={displayError(formik.errors.lastName, formik.touched.lastName)}
        />
        <InputField
          label="Email Address"
          name="email"
          type="text" // email shows default's browser error
          onChange={formik.handleChange}
          onBlur={ev => formik.handleBlur(ev)}
          value={formik.values.email}
          error={displayError(formik.errors.email, formik.touched.email)}
        />
        <Select
          label="Job Type"
          name="jobType"
          onChange={formik.handleChange}
          onBlur={ev => formik.handleBlur(ev)}
          value={formik.values.jobType}
          options={[
            { label: "Designer", value: "designer" },
            { label: "Developer", value: "developer" },
            { label: "QA Tester", value: "qaTester" },
            { label: "Product Manager", value: "productManager" }
          ]}
          error={displayError(formik.errors.jobType, formik.touched.jobType)}
          placeholder="Select a job type"
        />
        <Stack spacing="extraTight">
          <Checkbox
            label="I accept the terms and conditions"
            name="terms"
            onChange={formik.handleChange}
            value={formik.values.terms.toString()}
            checked={formik.values.terms}
            hasError={Boolean(formik.errors.terms && formik.touched.terms)}
          />
          {formik.errors.terms && formik.touched.terms ? (
            <Text type="critical" size="small">
              {formik.errors.terms}
            </Text>
          ) : null}
        </Stack>
        <Button submit loading={formik.isSubmitting}>
          Submit
        </Button>
        {submittedValues !== "" && (
          <Alert type="success" title="Form successfully submitted">
            {submittedValues}
          </Alert>
        )}
      </Stack>
    </form>
  )
}
