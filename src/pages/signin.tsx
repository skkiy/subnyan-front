import { SignInForm } from "components/signin"
import type { NextPage } from "next"
import Link from "next/link"
import { Box, Center, Text, Stack } from "@chakra-ui/react"
import { Layout } from "components/layouts/layout"

const SignIn: NextPage = () => {
  return (
    <Layout>
      <Center p={4}>
        <Stack spacing={4} w={"70%"} maxW={"700px"}>
          <Text fontSize={["20px", "24px", "24px"]} fontWeight={"bold"}>
            ログイン
          </Text>
          <SignInForm />
          <Center>
            <Link href={"/signup"}>
              <Text decoration={"underline"} cursor={"pointer"} fontSize={["14px", "16px"]}>
                新規登録
              </Text>
            </Link>
          </Center>
        </Stack>
      </Center>
    </Layout>
  )
}

export default SignIn
