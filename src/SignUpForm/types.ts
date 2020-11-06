export interface SignUpFormValues {
  firstName: string
  lastName: string
  email: string
  terms: boolean
  jobType: string
}

export interface SignUpFormErrors {
  firstName: string
  lastName: string
  email: string
  terms: boolean
  jobType: string
}

export type SignUpFieldNames = "firstName" | "lastName" | "email" | "jobType" | "terms"
