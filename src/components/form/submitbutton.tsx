import { Button } from "@chakra-ui/react"
import React, { ComponentProps } from "react"
import { FormSpy } from "react-final-form"

type Props = ComponentProps<typeof Button>

export const SubmitButton: React.FC<Props> = ({ size, label, disabled, ...rest }) => (
  <FormSpy subscription={{ submitting: true, hasValidationErrors: true }}>
    {({ submitting, hasValidationErrors }) => {
      const formDisabled = hasValidationErrors || submitting
      return (
        <Button
          size={size}
          type="submit"
          colorScheme="whiteAlpha"
          bg="white"
          variant="outline"
          disabled={formDisabled || disabled}
          {...rest}
          color="black"
        >
          {label}
        </Button>
      )
    }}
  </FormSpy>
)
