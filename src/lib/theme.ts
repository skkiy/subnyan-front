import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

export const theme = extendTheme({ config })

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})
