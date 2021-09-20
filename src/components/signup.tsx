import { Stack } from "@chakra-ui/react"
import { Form } from "components/form/form"
import { SubmitButton } from "components/form/submitbutton"
import { LabeledTextField } from "components/form/textfield"
import {
  handleSendEmailVerification,
  handleSignUpWithEmailAndPassword,
  useAuthState,
} from "lib/auth"
import { loginInput, LoginInputType } from "lib/validation"
import { FC } from "react"

export const SignUpForm: FC = () => {
  const { user, loading } = useAuthState()
  const handleSubmit = async (values: LoginInputType) => {
    const { email, password } = values
    await handleSignUpWithEmailAndPassword(email, password)
    if (!user) return
    await handleSendEmailVerification(user)
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
