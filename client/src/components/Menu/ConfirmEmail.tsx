import { ChangeEvent, FormEvent, useState } from "react"
import { toggleConfirmEmail } from "store/slices/menuSlice"
import { setUser } from "store/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { MdOutlineMarkEmailUnread } from "react-icons/md"
import axios from "axios"

interface ConfirmEmailProps {
  email: string
  password: string
}

export default ({email, password}: ConfirmEmailProps) => {
  const dispatch = useDispatch()
  const confirming_email = useSelector((state: RootState) => state.menu.confirming_email)
  const [verificationCode, setverificationCode] = useState("")
  const [error, setError] = useState<{ status: number, message: string } | null>(null) // 1 - wrong code | 2 - code expired

  const handleCodeChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement
    const value = input.value
    const valid = /^[0-9]{0,4}$/.test(value)
    if(valid){
      setverificationCode(value)
      setError(null)
    }
    else setverificationCode(verificationCode)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_API}/auth/verify-code`, { email, password, verificationCode })
      .then(res => res.data)
      .then(data => {
        if(data.status) setError({ status: data.status, message: data.message })
        else{
          dispatch(setUser({_id: data._id, display_name: data.display_name}))
          dispatch(toggleConfirmEmail())
        }
      })
  }

  return (
    <div className={`auth secondary ${confirming_email ? '' : 'hidden'}`}>
      <div className="title"><MdOutlineMarkEmailUnread />Confirmation code sent to your Email</div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="****" className={`auth-input ${error && error.status === 1 ? "error" : ""}`} value={verificationCode} onChange={handleCodeChange} required />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>
        <button className="btn white submit">Confirm</button>
      </form>
    </div>
  )
}