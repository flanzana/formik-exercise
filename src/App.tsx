import React, { useState } from "react"
import { Stack, Separator, Button, ButtonGroup, TextLink } from "@kiwicom/orbit-components"
import FormikApp from "./formik/FormikApp"
import ReactHookFormApp from "./reactHookForm/ReactHookFormApp"

const LIBRARY = {
  FORMIK: "formik",
  REACT_HOOK_FORM: "react_hook_form",
}
const { FORMIK, REACT_HOOK_FORM } = LIBRARY

type SelectionButtonProps = {
  onClick: () => void
  label: string
  isActive: boolean
}

const SelectionButton = ({ onClick, label, isActive }: SelectionButtonProps) => (
  <Button onClick={onClick} size="small" type={isActive ? "primary" : "white"}>
    {label}
  </Button>
)

const Link = ({ href, label }: { href: string; label: string }) => (
  <TextLink href={href} external size="small">
    {label}
  </TextLink>
)

function App() {
  const [displayedLibrary, setDisplayedLibrary] = useState(REACT_HOOK_FORM)

  return (
    <Stack>
      <ButtonGroup>
        <SelectionButton
          onClick={() => setDisplayedLibrary(FORMIK)}
          label="formik library"
          isActive={displayedLibrary === FORMIK}
        />
        <SelectionButton
          onClick={() => setDisplayedLibrary(REACT_HOOK_FORM)}
          label="react-hook-form library"
          isActive={displayedLibrary === REACT_HOOK_FORM}
        />
      </ButtonGroup>
      <Separator />
      {displayedLibrary === FORMIK && (
        <>
          <Link href="https://formik.org/docs/api/formik" label="formik documentation" />
          <FormikApp />
        </>
      )}
      {displayedLibrary === REACT_HOOK_FORM && (
        <>
          <Stack direction="column" spacing="tight">
            <Link
              href="https://react-hook-form.com/get-started"
              label="react-hook-form documentation"
            />
            <Link
              href="https://github.com/react-hook-form/react-hook-form/tree/master/examples"
              label="react-hook-form examples"
            />
          </Stack>
          <ReactHookFormApp />
        </>
      )}
    </Stack>
  )
}

export default App
