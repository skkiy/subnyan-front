import { Box, Text, Input } from "@chakra-ui/react"
import { forwardRef, ComponentPropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label: string
  type?: "text" | "password" | "email" | "number"
  isRequired?: boolean
  disabled?: boolean
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, type, isRequired, disabled, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <Box>
        <Box>
          <Text>{label}</Text>
          <Input
            type={type}
            bg="white"
            {...input}
            disabled={submitting || disabled}
            {...props}
            ref={ref}
          />
        </Box>

        {touched && normalizedError && <Box role="alert">{normalizedError}</Box>}
      </Box>
    )
  }
)
