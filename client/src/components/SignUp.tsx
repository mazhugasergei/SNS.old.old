import axios from "axios"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { setUser } from "store/slices/userSlice"
import { toggleLogIn, toggleSignUp } from "store/slices/menuSlice"

export default () => {
  const dispatch = useDispatch()
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [repeatPassword, setRepeatPassword] = useState<string>("")
  const [error, setError] = useState<{ status: number, message: string } | null>(null) // 1 - user exists | 2 - different passwords

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    if(password != repeatPassword){ setError({ status: 2, message: "Passwords don't match" }); return }
    await axios.post(`${process.env.REACT_APP_API}/auth/sign-up`, { username, password })
      .then(res => res.data)
      .then(data => {
        if(data.status) setError({ status: data.status, message: data.message })
        else{
          // set token
          localStorage.setItem('x-access-token', data.token)
          // set user info
          dispatch(setUser({ _id: data._id, display_name: data.display_name }))
          // back to menu
          dispatch(toggleSignUp())
          // clear inputs
          setUsername("")
          setPassword("")
        }
      })
  }

  return (
    <div className={`auth ${signing_up ? 'shown' : ''}`}>
      <div className="title">﹏<br/>Create your account</div>
      <form onSubmit={handleSignUp}>
        <input className={`user-input ${error && error.status === 1 ? "error" : ""}`} value={username} onChange={e => { setUsername(e.target.value); setError(null) }} type="text" placeholder="Username" />
        <input className={`user-input ${error && error.status === 2 ? "error" : ""}`} value={password} onChange={e => { setPassword(e.target.value); setError(null) }} type="password" placeholder="Password" />
        <input className={`user-input ${error && error.status === 2 ? "error" : ""}`} value={repeatPassword} onChange={e => { setRepeatPassword(e.target.value); setError(null) }} type="password" placeholder="Repeat password" />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>
        <button className="btn white submit">Sign up</button>
      </form>
      <div className="bottom-link">Have an account? <button className="link" onClick={() => dispatch(toggleLogIn())}>Log in</button></div>
    </div>
  )
}