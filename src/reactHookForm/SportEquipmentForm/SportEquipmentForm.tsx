import React, { useState } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import {
  Stack,
  Button,
  Checkbox,
  Select,
  Text,
  Alert,
  Heading,
  Radio,
  ChoiceGroup,
  List,
  ListItem,
} from "@kiwicom/orbit-components"
// import { yupResolver } from "@hookform/resolvers/yup"

import {
  equipmentOptions,
  flightInitialValues,
  flightsOptions,
  getEquipmentLabel,
  getPassengerName,
  getSelectedFlightsLabels,
  passengerOptions,
} from "./services/helpers"
import { SportEquipmentValues } from "./services/types";
import FieldWithHeading from "../../formik/SportEquipmentForm/components/common/FieldWithHeading"
import FormTextInputField from "./common/FormTextInputField"

const defaultValues = {
  equipmentType: undefined,
  passenger: undefined,
  length: undefined,
  width: undefined,
  height: undefined,
  weight: undefined,
  flights: flightInitialValues,
  terms: false,
}

const ruleOnlyNumbers = { value: /^[0-9]+$/, message: "Only numbers are allowed." }

export default function SportEquipmentForm() {
  const [submittedValues, setSubmittedValues] = useState("")
  const { control, handleSubmit, clearErrors, formState, reset, getValues } = useForm<
    SportEquipmentValues
  >({
    defaultValues,
    reValidateMode: "onBlur", // this will hide error once you type into field again and validate it again on blur
    // resolver: yupResolver(sportEquipmentValidationSchema),
  })
  const values = getValues()

  const onSubmit: SubmitHandler<SportEquipmentValues> = async (data: SportEquipmentValues) => {
    await new Promise(r => setTimeout(r, 1000))
    setSubmittedValues(JSON.stringify(data, null, 2))
    reset(defaultValues)
  }

  const { errors, isSubmitting } = formState

  return (
    <>
      <form
        // "handleSubmit" will validate your inputs before invoking your on submit function
        onSubmit={handleSubmit(onSubmit)}
      >
        <div style={{ maxWidth: "650px", margin: "0 auto" }}>
          <Stack spacing="loose">
            <Heading>Add your sport equipment</Heading>

            <FieldWithHeading heading="What do you want to take with you?">
              <Controller
                name="equipmentType"
                control={control}
                rules={{ required: "Required equipment type" }}
                render={({ field }) => (
                  <Select
                    label="Sport equipment"
                    name={field.name}
                    value={field.value}
                    onChange={ev => {
                      clearErrors("equipmentType")
                      field.onChange(ev)
                    }}
                    onBlur={field.onBlur}
                    error={errors.equipmentType?.message}
                    options={equipmentOptions}
                    placeholder="Select your equipment"
                  />
                )}
              />
            </FieldWithHeading>

            <FieldWithHeading heading="Who does the equipment belong to?">
              <Controller
                name="passenger"
                control={control}
                rules={{ required: "Required passenger" }}
                render={({ field }) => (
                  <ChoiceGroup
                    label="Passenger"
                    onChange={ev => {
                      clearErrors("passenger")
                      field.onChange(ev)
                    }}
                    error={errors.passenger?.message}
                  >
                    {passengerOptions.map(option => (
                      <Radio
                        key={option.value}
                        name={field.name}
                        label={option.label}
                        value={option.value}
                        checked={option.value === field.value}
                        onChange={field.onChange}
                      />
                    ))}
                  </ChoiceGroup>
                )}
              />
            </FieldWithHeading>

            <FieldWithHeading heading="What are the dimensions of your equipment?">
              <>
                <Heading type="title3">{`${getEquipmentLabel(
                  values.equipmentType,
                )} for ${getPassengerName(values.passenger)}`}</Heading>
                <Stack direction="column" mediumMobile={{ direction: "row" }}>
                  <FormTextInputField<SportEquipmentValues>
                    label="Length (cm)"
                    controllerProps={{
                      name: "length",
                      control,
                      rules: {
                        // valueAsNumber: true,
                        required: { value: true, message: "Required length" },
                        min: { value: 1, message: "Must be 1 cm or more" },
                        max: { value: 200, message: "Must be 2 meters or less" },
                        pattern: ruleOnlyNumbers,
                      },
                    }}
                    clearErrors={clearErrors}
                  />
                  <FormTextInputField<SportEquipmentValues>
                    label="Width (cm)"
                    controllerProps={{
                      name: "width",
                      control,
                      rules: {
                        // valueAsNumber: true,
                        required: { value: true, message: "Required width" },
                        min: { value: 1, message: "Must be 1 cm or more" },
                        max: { value: 200, message: "Must be 2 meters or less" },
                        pattern: ruleOnlyNumbers,
                      },
                    }}
                    clearErrors={clearErrors}
                  />
                  <FormTextInputField<SportEquipmentValues>
                    label="Height (cm)"
                    controllerProps={{
                      name: "height",
                      control,
                      rules: {
                        // valueAsNumber: true,
                        required: { value: true, message: "Required height" },
                        min: { value: 1, message: "Must be 1 cm or more" },
                        max: { value: 200, message: "Must be 2 meters or less" },
                        pattern: ruleOnlyNumbers,
                      },
                    }}
                    clearErrors={clearErrors}
                  />
                  <FormTextInputField<SportEquipmentValues>
                    label="Weight (kg)"
                    controllerProps={{
                      name: "weight",
                      control,
                      rules: {
                        // valueAsNumber: true,
                        required: { value: true, message: "Required weight" },
                        min: { value: 0, message: "Must be more than 0 kg" },
                        max: { value: 100, message: "Must be 100 kg or less" },
                        pattern: ruleOnlyNumbers,
                      },
                    }}
                    clearErrors={clearErrors}
                  />
                </Stack>
              </>
            </FieldWithHeading>

            <FieldWithHeading heading="Which flights do you want to buy this service for?">
              <Controller
                name="flights"
                control={control}
                rules={{
                  // validate object can accept custom validators
                  validate: {
                    isNothingSelected: value => Object.values(value).some(Boolean),
                  },
                }}
                render={({ field }) => (
                  <ChoiceGroup
                    label="Flights"
                    onChange={ev => {
                      const value = (ev.target as HTMLInputElement).value
                      clearErrors("flights")
                      field.onChange({
                        ...field.value,
                        [value]: !field.value[value],
                      })
                    }}
                    error={errors.flights ? "Select at least 1 flight" : null}
                  >
                    {flightsOptions.map(option => (
                      <Checkbox
                        key={option.value}
                        name={field.name}
                        label={option.label}
                        value={option.value}
                        checked={field.value[option.value]}
                        onChange={field.onChange}
                      />
                    ))}
                  </ChoiceGroup>
                )}
              />
            </FieldWithHeading>

            <FieldWithHeading heading="Summary">
              <>
                <List>
                  <ListItem>{`Passenger: ${getPassengerName(values.passenger)}`}</ListItem>
                  <ListItem>{`Equipment type: ${getEquipmentLabel(
                    values.equipmentType,
                  )}`}</ListItem>
                  <ListItem>{`Size: ${values.length} x ${values.width} x ${values.height} cm, ${values.weight} kg`}</ListItem>
                  <ListItem>{`Flights: ${getSelectedFlightsLabels(values.flights)}`}</ListItem>
                </List>
                <Controller
                  name="terms"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
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
              </>
            </FieldWithHeading>

            <Button submit loading={isSubmitting}>
              Submit request
            </Button>

            {submittedValues !== "" && (
              <Alert type="success" title="Sport equipment requested">
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
