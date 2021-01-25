import React, { useState } from "react"
import { Stack, Card, CardSection, Button, ButtonGroup } from "@kiwicom/orbit-components"
import SignUpFormHook from "./SignUpForm/SignUpFormHook"
import SignUpFormContext from "./SignUpForm/SignUpFormContext"
import SportEquipmentSingleForm from "./SportEquipmentForm/SportEquipmentSingleForm"

const FORM = {
  SIGNUP_SINGLE_STEP: "signup_single",
  SPORT_SINGLE_STEP: "sport_single",
  SPORT_MULTI_STEP: "sport_multi",
}
const { SIGNUP_SINGLE_STEP, SPORT_SINGLE_STEP, SPORT_MULTI_STEP } = FORM

type SelectionButtonProps = {
  onClick: () => void
  label: string
  isActive: boolean
}

const SelectionButton = ({ onClick, label, isActive }: SelectionButtonProps) => (
  <Button onClick={onClick} size="small" type={isActive ? "secondary" : "white"}>
    {label}
  </Button>
)

function FormikApp() {
  const [displayedForm, setDisplayedForm] = useState(SPORT_SINGLE_STEP)

  return (
    <Stack spacing="extraLoose">
      <ButtonGroup>
        <SelectionButton
          onClick={() => setDisplayedForm(SIGNUP_SINGLE_STEP)}
          label="Single-step form (Sign up)"
          isActive={displayedForm === SIGNUP_SINGLE_STEP}
        />
        <SelectionButton
          onClick={() => setDisplayedForm(SPORT_SINGLE_STEP)}
          label="Single-step form (Add sport equipment)"
          isActive={displayedForm === SPORT_SINGLE_STEP}
        />
        <SelectionButton
          onClick={() => setDisplayedForm(SPORT_MULTI_STEP)}
          label="Multi-step form (Add sport equipment)"
          isActive={displayedForm === SPORT_MULTI_STEP}
        />
      </ButtonGroup>
      {displayedForm === SIGNUP_SINGLE_STEP && (
        <Stack direction="row">
          <Card title="Sign Up Form (useFormik hook)">
            <CardSection>
              <SignUpFormHook />
            </CardSection>
          </Card>
          <Card title="Sign Up Form (Formik context)">
            <CardSection>
              <SignUpFormContext />
            </CardSection>
          </Card>
        </Stack>
      )}
      {displayedForm === SPORT_SINGLE_STEP && <SportEquipmentSingleForm />}
      {displayedForm === SPORT_MULTI_STEP && "TODO"}
    </Stack>
  )
}

export default FormikApp
