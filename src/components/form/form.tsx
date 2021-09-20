import { Text } from "@chakra-ui/react"
import { PropsWithoutRef, ReactNode } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"

export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  children: ReactNode
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error: any) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      initialValuesEqual={() => true}
      render={({ handleSubmit, submitting, submitError }) => {
        return (
          <form onSubmit={handleSubmit} {...props}>
            {children}

            {submitError && (
              <Text role="alert" color="red.100">
                {submitError}
              </Text>
            )}
          </form>
        )
      }}
    />
  )
}
