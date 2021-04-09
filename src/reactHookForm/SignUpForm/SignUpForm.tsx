import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import { Stack, Button, InputField, Checkbox, Select, Text, Alert } from "@kiwicom/orbit-components"

const defaultValues = {
  name: "",
  email: "",
  terms: false,
  jobType: "",
}

export default function SignUpForm() {
  const [submittedValues, setSubmittedValues] = useState("")
  const {
    control,
    handleSubmit,
    clearErrors,
    formState,
    reset,
    // getValues,
    // register,
    // setError,
    // setValue,
    // trigger,
    // unregister,
    // watch,
  } = useForm({
    defaultValues,
    reValidateMode: "onBlur", // this will hide error once you type into field again and validate it again on blur
    // mode,
    // resolver,
    // context,
    // criteriaMode,
    // shouldFocusError,
    // shouldUnregister,
  })
  const { errors, isSubmitting } = formState

  return (
    <>
      <form
        // "handleSubmit" will validate your inputs before invoking your on submit function
        onSubmit={handleSubmit(async data => {
          await new Promise(r => setTimeout(r, 1000))
          setSubmittedValues(JSON.stringify(data, null, 2))
          reset(defaultValues)
        })}
      >
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <Stack spacing="loose">
            <Controller
              name="name"
              // defaultValue={defaultValues.firstName} // defaultValues already passed into useForm
              control={control}
              rules={{
                required: { value: true, message: "Name is required" },
                minLength: { value: 2, message: "Name is too short" },
                maxLength: { value: 20, message: "Name is too long" },
                pattern: { value: /^[a-zA-Z]+$/, message: "Only letters are allowed." },
              }}
              render={(
                // { name, value, onChange, onBlur } /*, { invalid, isDirty, isTouched } */, // in v6
                { field, fieldState }, // in v7
              ) => (
                <InputField
                  label="Name"
                  type="text"
                  name={field.name}
                  value={field.value}
                  onChange={ev => {
                    clearErrors("name")
                    field.onChange(ev)
                  }}
                  onBlur={field.onBlur}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: { value: true, message: "Email address is required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <InputField
                  label="Email Address"
                  type="text"
                  name={field.name}
                  value={field.value}
                  onChange={ev => {
                    clearErrors("email")
                    field.onChange(ev)
                  }}
                  onBlur={field.onBlur}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              name="jobType"
              control={control}
              rules={{
                required: "Required job type",
              }}
              render={({field}) => (
                <Select
                  label="Job Type"
                  name={field.name}
                  value={field.value}
                  onChange={ev => {
                    clearErrors("jobType")
                    field.onChange(ev)
                  }}
                  onBlur={field.onBlur}
                  error={errors.jobType?.message}
                  options={[
                    { label: "Designer", value: "designer" },
                    { label: "Developer", value: "developer" },
                    { label: "QA Tester", value: "qaTester" },
                    { label: "Product Manager", value: "productManager" },
                  ]}
                  placeholder="Select a job type"
                />
              )}
            />

            <Controller
              name="terms"
              control={control}
              rules={{ required: true }}
              render={({field}) => (
                <Stack spacing="extraTight">
                  <Checkbox
                    label="I accept the terms and conditions"
                    name={field.name}
                    value={field.value.toString()}
                    onChange={() => {
                      clearErrors("terms")
                      field.onChange(!field.value)
                    }}
                    checked={field.value}
                    hasError={Boolean(errors.terms?.type)}
                  />
                  {errors.terms?.type ? (
                    <Text type="critical" size="small">
                      You must accept the terms and conditions
                    </Text>
                  ) : null}
                </Stack>
              )}
            />

            <Button submit loading={isSubmitting}>
              Submit
            </Button>

            {submittedValues !== "" && (
              <Alert type="success" title="Form successfully submitted">
                {submittedValues}
              </Alert>
            )}
          </Stack>
        </div>
      </form>

      {/* this displays devtools in browser */}
      <DevTool control={control} />
    </>
  )
}
