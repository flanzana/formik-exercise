import React, { useState } from "react"
import { Stack, Button, ButtonGroup } from "@kiwicom/orbit-components"

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

function ReactHookFormApp() {
  const [displayedForm, setDisplayedForm] = useState(SIGNUP_SINGLE_STEP)

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
      {displayedForm === SIGNUP_SINGLE_STEP && "TODO signup"}
      {displayedForm === SPORT_SINGLE_STEP && "TODO sport single"}
      {displayedForm === SPORT_MULTI_STEP && "TODO sport multiform"}
    </Stack>
  )
}

export default ReactHookFormApp
