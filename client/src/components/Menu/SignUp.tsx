import axios from "axios"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { toggleLogIn, toggleConfirmEmail } from "store/slices/menuSlice"

interface SignUpProps {
  email: string
  setEmail: (state: string) => void
  password: string
  setPassword: (state: string) => void
  repeatPassword: string
  setRepeatPassword: (state: string) => void
}

export default ({email, setEmail, password, setPassword, repeatPassword, setRepeatPassword}: SignUpProps) => {
  const dispatch = useDispatch()
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)
  const [error, setError] = useState<{ status: number, message: string } | null>(null) // 1 - user exists | 2 - different passwords

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if(password != repeatPassword){ setError({ status: 2, message: "Passwords don't match" }); return }
    await axios.post(`${process.env.REACT_APP_API}/auth/sign-up`, { email })
      .then(res => res.data)
      .then(data => {
        if(data.status) setError({ status: data.status, message: data.message })
        else dispatch(toggleConfirmEmail())
      })
  }

  return (
    <div className={`auth ${signing_up ? '' : 'hidden'}`}>
      <div className="title">﹏<br/>Create your account</div>
      <form onSubmit={handleSubmit}>
        <input className={`auth-input ${error && error.status === 1 ? "error" : ""}`} value={email} onChange={e => { setEmail(e.target.value); setError(null) }} type="email" placeholder="Email" required />
        <input className={`auth-input ${error && error.status === 2 ? "error" : ""}`} value={password} onChange={e => { setPassword(e.target.value); setError(null) }} type="password" placeholder="Password" required />
        <input className={`auth-input ${error && error.status === 2 ? "error" : ""}`} value={repeatPassword} onChange={e => { setRepeatPassword(e.target.value); setError(null) }} type="password" placeholder="Repeat password" required />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>
        <button className="btn white submit">Sign up</button>
      </form>
      <div className="bottom-link">Have an account? <button className="link" onClick={() => dispatch(toggleLogIn())}>Log in</button></div>
    </div>
  )
}