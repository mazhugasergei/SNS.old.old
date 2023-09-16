import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { toggleConfirmEmail } from "store/slices/menuSlice"
import { setUser } from "store/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { MdOutlineMarkEmailUnread } from "react-icons/md"
import axios from "axios"

interface ConfirmEmailProps {
  email: string
  password: string
  error: { status: number, message: string } | null
  setError: (state: { status: number, message: string } | null) => void
}

export default ({email, password, error, setError}: ConfirmEmailProps) => {
  const dispatch = useDispatch()
  const confirming_email = useSelector((state: RootState) => state.menu.confirming_email)
  const [verificationCode, setVerificationCode] = useState("")

  useEffect(()=>{
    // clear input
    setVerificationCode("")
  }, [confirming_email])

  const handleCodeChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement
    const value = input.value
    const valid = /^[0-9]{0,4}$/.test(value)
    if(valid){
      setVerificationCode(value)
      setError(null)
    }
    else setVerificationCode(verificationCode)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_API}/auth/verify-code`, { email, password, verificationCode })
      .then(res => res.data)
      .then(data => {
        if(data.status) setError({ status: data.status, message: data.message })
        else{
          // set token
          localStorage.setItem('x-access-token', data.token)
          // set user info
          dispatch(setUser({_id: data._id, display_name: data.display_name}))
          // back to menu
          dispatch(toggleConfirmEmail())
        }
      })
  }

  return (
    <div className={`auth secondary ${confirming_email ? '' : 'hidden'}`}>
      <div className="title"><MdOutlineMarkEmailUnread />Confirmation code sent to your Email</div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="****" className={`auth-input ${error && error.status ? "error" : ""}`} value={verificationCode} onChange={handleCodeChange} required />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>
        <button className="btn white submit">Confirm</button>
      </form>
    </div>
  )
}