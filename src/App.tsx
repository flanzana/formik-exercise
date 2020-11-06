import React from "react"
import { Stack, Card, CardSection } from "@kiwicom/orbit-components"
import SignUpFormHook from "./SignUpForm/SignUpFormHook"
import SignUpFormContext from "./SignUpForm/SignUpFormContext"

function App() {
  return (
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
  )
}

export default App
