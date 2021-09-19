import type { NextPage } from "next"
import { useAuthState } from "lib/auth"
import { useHelloUserLazyQuery } from "graphql/generated"
import { useEffect, useState } from "react"

const SignIn: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [fetch, { called, loading, data }] = useHelloUserLazyQuery({
    variables: {
      name: email,
    },
  })

  const { user, loading: userLoading, signInWithEmailAndPassword } = useAuthState()

  useEffect(() => {
    if (!user) return
    fetch()
  }, [user])

  useEffect(() => {
    if (called && !loading) {
      console.log(data)
    }
  }, [called, loading])

  return (
    <div>
      <h1>SignIn</h1>
      <input
        name={"email"}
        type={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name={"password"}
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signInWithEmailAndPassword(email, password)}>おす</button>
    </div>
  )
}

export default SignIn
