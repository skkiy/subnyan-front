import { SignUpForm } from "components/signup"
import type { NextPage } from "next"
import Link from "next/link"
import { Center, Text, Stack } from "@chakra-ui/react"
import { Layout } from "components/layouts/layout"

const SignUp: NextPage = () => {
  return (
    <Layout>
      <Center p={4}>
        <Stack spacing={4} w={"70%"} maxW={"700px"}>
          <Text fontSize={["20px", "24px", "24px"]} fontWeight={"bold"}>
            新規登録
          </Text>
          <SignUpForm />
          <Center>
            <Link href={"/signin"}>
              <Text decoration={"underline"} cursor={"pointer"} fontSize={["14px", "16px"]}>
                ログイン
              </Text>
            </Link>
          </Center>
        </Stack>
      </Center>
    </Layout>
  )
}

export default SignUp
