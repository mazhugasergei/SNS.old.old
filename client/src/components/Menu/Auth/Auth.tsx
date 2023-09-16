import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
// components
import LogIn from "components/Menu/Auth/LogIn"
import SignUp from "components/Menu/Auth/SignUp"
import ConfirmEmail from "components/Menu/Auth/ConfirmEmail"

export default () => {
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)
  const confirming_email = useSelector((state: RootState) => state.menu.confirming_email)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<{ status: number, message: string } | null>(null)
    //LogIn         1 - wrong email | 2 - wrong password
    //SignUp        1 - user exists | 2 - different passwords
    //ConfirmEmail  1 - wrong code  | 2 - code expired

  useEffect(()=>{
    // clear forms
    if(!confirming_email){
      setEmail("")
      setPassword("")
      setRepeatPassword("")
      setError(null)
    }
  }, [logging_in, signing_up])

  return (
    <>
      <LogIn {...{email, setEmail, password, setPassword, error, setError}} />
      <SignUp {...{email, setEmail, password, setPassword, repeatPassword, setRepeatPassword, error, setError}} />
      <ConfirmEmail {...{email, password, error, setError}} />
    </>
  )
}