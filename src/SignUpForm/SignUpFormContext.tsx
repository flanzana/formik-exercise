import React from "react"
import { Formik, Form, FormikHelpers } from "formik"
import { Stack, Button, Alert } from "@kiwicom/orbit-components"
import { signUpValidationSchema } from "./helpers"
import { SignUpFormValues } from "./types"
import FormikTextInputField from "../commonFormikComponents/FormikTextInputField"
import FormikCheckbox from "../commonFormikComponents/FormikCheckbox"
import FormikSelect from "../commonFormikComponents/FormikSelect"

export default function SignUpFormContext() {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        terms: false,
        jobType: "",
      }}
      // validate={signUpValidate}
      validationSchema={signUpValidationSchema}
      onSubmit={async (
        values: SignUpFormValues,
        { setStatus }: FormikHelpers<SignUpFormValues>,
      ) => {
        await new Promise(r => setTimeout(r, 1000))
        setStatus("success")
      }}
    >
      {({ isSubmitting, values, status }) => (
        <Form>
          <Stack spacing="loose">
            <FormikTextInputField label="First Name" name="firstName" />
            <FormikTextInputField label="Last Name" name="lastName" />
            <FormikTextInputField
              label="Email Address"
              name="email"
              placeholder="e.g. test@test.com"
            />
            <FormikSelect
              label="Job Type"
              name="jobType"
              options={[
                { label: "Designer", value: "designer" },
                { label: "Developer", value: "developer" },
                { label: "QA Tester", value: "qaTester" },
                { label: "Product Manager", value: "productManager" },
              ]}
              placeholder="Select a job type"
            />
            <FormikCheckbox label="I accept the terms and conditions" name="terms" />
            <Button submit loading={isSubmitting}>
              Submit
            </Button>
            {status === "success" && (
              <Alert type="success" title="Form successfully submitted">
                {JSON.stringify(values, null, 2)}
              </Alert>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
