import { Stack } from "@chakra-ui/react"
import { Form } from "components/form/form"
import { SubmitButton } from "components/form/submitbutton"
import { LabeledTextField } from "components/form/textfield"
import { handleSignInWithEmailAndPassword } from "lib/auth"
import { loginInput, LoginInputType } from "lib/validation"

export const SignInForm = () => {
  const handleSubmit = async (values: LoginInputType) => {
    const { email, password } = values
    await handleSignInWithEmailAndPassword(email, password)
  }
  return (
    <Form onSubmit={handleSubmit} schema={loginInput}>
      <Stack spacing={4}>
        <LabeledTextField name={"email"} label={"メールアドレス"} />
        <LabeledTextField name={"password"} label={"パスワード"} />
        <SubmitButton label={"ログイン"} />
      </Stack>
    </Form>
  )
}
