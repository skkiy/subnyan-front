import { Box, Flex } from "@chakra-ui/react"
import { Header } from "components/layouts/header"
import { Footer } from "components/layouts/footer"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Flex direction={"column"} minH={"100vh"}>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Flex>
  )
}
