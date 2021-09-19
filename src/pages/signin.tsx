import type { NextPage } from "next"
import { getAuth, signIn } from "lib/auth"
import { useHelloUserQuery } from "graphql/generated"
import { useEffect } from "react"

const SignIn: NextPage = () => {
  const email = "sasayu1027@gmail.com"
  const password = "abcd1234"
  const { loading, error, data, refetch } = useHelloUserQuery({
    variables: {
      name: "tetete",
    },
  })

  const user = getAuth().currentUser

  useEffect(() => {
    console.log(user)
    if (!user) return
    refetch({
      name: user.email ?? "",
    }).then((res) => {
      console.log(res)
    })
  }, [user])

  return (
    <div>
      <h1>SignIn</h1>
      <button onClick={() => signIn(email, password)}>おす</button>
    </div>
  )
}

export default SignIn
