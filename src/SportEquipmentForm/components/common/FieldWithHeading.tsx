import React from "react"
import { Stack, Heading } from "@kiwicom/orbit-components"

type Props = {
  heading: string
  children: React.ReactNode
}

const FieldWithHeading = ({ heading, children }: Props) => {
  return (
    <Stack>
      <Heading type="title2">{heading}</Heading>
      {children}
    </Stack>
  )
}
export default FieldWithHeading
