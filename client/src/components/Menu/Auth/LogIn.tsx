import axios from "axios"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { setUser } from "store/slices/userSlice"
import { toggleLogIn, toggleSignUp } from "store/slices/menuSlice"

interface LogInProps {
  email: string
  setEmail: (state: string) => void
  password: string
  setPassword: (state: string) => void
  error: { status: number, message: string } | null
  setError: (state: { status: number, message: string } | null) => void
}

export default ({email, setEmail, password, setPassword, error, setError}: LogInProps) => {
  const dispatch = useDispatch()
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_API}/auth/log-in`, { email, password })
      .then(res => res.data)
      .then(data => {
        if(data.status) setError({ status: data.status, message: data.message })
        else{
          // set token
          localStorage.setItem('x-access-token', data.token)
          // set user info
          dispatch(setUser({ _id: data._id, display_name: data.display_name }))
          // back to menu
          dispatch(toggleLogIn())
        }
      })
  }

  return (
    <div className={`auth ${logging_in ? '' : 'hidden'}`}>
      <div className="title">﹏<br/>Welcome back!</div>
      <form onSubmit={handleSubmit}>
        <input className={`auth-input ${error && error.status === 1 ? "error" : ""}`} value={email} onChange={e => { setEmail(e.target.value); setError(null) }} type="text" placeholder="Email / Email" required />
        <input className={`auth-input ${error && error.status === 2 ? "error" : ""}`} value={password} onChange={e => { setPassword(e.target.value); setError(null) }} type="password" placeholder="Password" required />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>
        <button className="btn white submit">Log in</button>
      </form>
      <div className="bottom-link">Don't have an account? <button className="link" onClick={() => dispatch(toggleSignUp())}>Sign up</button></div>
    </div>
  )
}