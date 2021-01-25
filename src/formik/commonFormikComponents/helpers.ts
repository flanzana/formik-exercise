type DisplayError = (error: string | undefined, isTouched: boolean | undefined) => string | null

export const displayError: DisplayError = (error, isTouched) => (error && isTouched ? error : null)
