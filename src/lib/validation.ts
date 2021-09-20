import * as z from "zod"

export const loginInput = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty(),
})

export type LoginInputType = z.infer<typeof loginInput>
