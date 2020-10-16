import React from 'react';
import { Stack, TextLink, Card, CardSection } from "@kiwicom/orbit-components"
import SignUpFormHook from "./SignUpForm/SignUpFormHook";

function App() {
  return (
    <Stack>
      <TextLink
        href="https://formik.org/docs/tutorial"
        external
      >
        Formik tutorial
      </TextLink>
      <Card title="Sign Up Form">
        <CardSection>
          <SignUpFormHook />
        </CardSection>
      </Card>
    </Stack>
  );
}

export default App;
