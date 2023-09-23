import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
// components
import LogIn from "components/Menu/Forms/Auth/LogIn"
import SignUp from "components/Menu/Forms/Auth/SignUp"
import ConfirmEmail from "components/Menu/Forms/Auth/ConfirmEmail"

export default () => {
  const transition = useSelector((state: RootState) => state.ui.transition)
  const expanded_menu = useSelector((state: RootState) => state.menu.expanded_menu)
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
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
    if(!confirming_email) setTimeout(()=>{
      setEmail("")
      setPassword("")
      setRepeatPassword("")
      setError(null)
    }, transition)
  }, [expanded_menu, logging_in])

  useEffect(()=>{
    setError(null)
  }, [confirming_email])

  return (
    <>
      <LogIn {...{email, setEmail, password, setPassword, error, setError}} />
      <SignUp {...{email, setEmail, password, setPassword, repeatPassword, setRepeatPassword, error, setError}} />
      <ConfirmEmail {...{email, password, error, setError}} />
    </>
  )
}