import { SignUpFormErrors, SignUpFormValues } from "./types";

type DisplayError = (error: string | undefined, isTouched: boolean | undefined) => (string | null)
export const displayError: DisplayError = (error, isTouched) =>
  error && isTouched ? error : null

type SignUpValidate = (values: SignUpFormValues) => SignUpFormErrors | {}
export const signUpValidate: SignUpValidate = (values) => {
  let errors = {}
  if (!values.firstName) {
    errors = {
      ...errors,
      firstName: "Required first name",
    }
  } else if (values.firstName.length < 2) {
    errors = {
      ...errors,
      firstName: "Too short",
    }
  } else if (values.firstName.length > 5) {
    errors = {
      ...errors,
      firstName: "Must be 5 characters or less",
    }
  }

  if (!values.lastName) {
    errors = {
      ...errors,
      lastName: "Required last name",
    }
  } else if (values.lastName.length < 2) {
    errors = {
      ...errors,
      lastName: "Too short",
    }
  } else if (values.lastName.length > 10) {
    errors = {
      ...errors,
      lastName: "Must be 10 characters or less",
    }
  }

  if (!values.email) {
    errors = {
      ...errors,
      email: "Required email address",
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors = {
      ...errors,
      email: "Invalid email address",
    }
  }

  if (!values.jobType) {
    errors = {
      ...errors,
      jobType: "Required job type",
    }
  }

  if (!values.terms) {
    errors = {
      ...errors,
      terms: "You must accept the terms and conditions",
    }
  }

  return errors
}
