import React from "react"
import { Form, Formik, FormikHelpers } from "formik"
import { Button, Heading, Stack, List, ListItem, Alert } from "@kiwicom/orbit-components"
import FormikTextInputField from "../commonFormikComponents/FormikTextInputField"
import FormikSelect from "../commonFormikComponents/FormikSelect"
import FormikCheckbox from "../commonFormikComponents/FormikCheckbox"
import FormikRadioGroup from "../commonFormikComponents/FormikRadioGroup"
import { SportEquipmentValues } from "./types"
import FieldWithHeading from "./components/common/FieldWithHeading"
import {
  equipmentOptions,
  flightInitialValues,
  flightsOptions,
  getEquipmentLabel,
  getPassengerName,
  getSelectedFlightsLabels,
  passengerOptions,
  sportEquipmentValidationSchema,
} from "./helpers"
import FormikCheckboxGroup from "../commonFormikComponents/FormikCheckboxGroup"

const SportEquipmentSingleForm = () => {
  return (
    <Formik
      initialValues={{
        equipmentType: "",
        passenger: "",
        length: "",
        width: "",
        height: "",
        weight: "",
        flights: flightInitialValues,
        terms: false,
      }}
      validationSchema={sportEquipmentValidationSchema}
      onSubmit={async (
        values: SportEquipmentValues,
        { setStatus }: FormikHelpers<SportEquipmentValues>,
      ) => {
        await new Promise(r => setTimeout(r, 1000))
        setStatus("success")
      }}
    >
      {({ isSubmitting, values, errors, status }) => (
        <Form>
          <Stack spacing="extraLoose">
            <Heading>Add your sport equipment</Heading>

            <FieldWithHeading heading="What do you want to take with you?">
              <FormikSelect
                label="Sport equipment"
                name="equipmentType"
                options={equipmentOptions}
                placeholder="Select your equipment"
              />
            </FieldWithHeading>

            <FieldWithHeading heading="Who does the equipment belong to?">
              <FormikRadioGroup label="Passenger" name="passenger" options={passengerOptions} />
            </FieldWithHeading>

            <FieldWithHeading heading="What are the dimensions of your equipment?">
              <>
                <Heading type="title3">{`${getEquipmentLabel(
                  values.equipmentType,
                )} for ${getPassengerName(values.passenger)}`}</Heading>
                <Stack direction="column" mediumMobile={{ direction: "row" }}>
                  <FormikTextInputField label="Length (cm)" name="length" />
                  <FormikTextInputField label="Width (cm)" name="width" />
                  <FormikTextInputField label="Height (cm)" name="height" />
                  <FormikTextInputField label="Weight (kg)" name="weight" />
                </Stack>
              </>
            </FieldWithHeading>

            <FieldWithHeading heading="Which flights do you want to buy this service for?">
              <FormikCheckboxGroup label="Flights" name="flights" options={flightsOptions} />
            </FieldWithHeading>

            {/*<p>{JSON.stringify(values, null, 2)}</p>*/}
            {/*<p>{JSON.stringify(errors, null, 2)}</p>*/}

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
                <FormikCheckbox label="I accept the terms and conditions" name="terms" />
              </>
            </FieldWithHeading>

            {status === "success" && (
              <Alert type="success" title="Sport equipment requested">
                {JSON.stringify(values, null, 2)}
              </Alert>
            )}

            <Button submit loading={isSubmitting}>
              Submit request
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export default SportEquipmentSingleForm
