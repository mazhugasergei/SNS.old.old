import axios from "axios"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { setUser } from "store/slices/userSlice"
import { toggleLogIn, toggleSignUp } from "store/slices/menuSlice"

export default () => {
  const dispatch = useDispatch()
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<{ status: number, message: string } | null>(null) // 1 - wrong username | 2 - wrong password

  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_API}/auth/log-in`, { username, password })
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
          // clear inputs
          setUsername("")
          setPassword("")
        }
      })
  }

  return (
    <div className={`auth ${logging_in ? 'shown' : ''}`}>
      <div className="title">﹏<br/>Welcome back!</div>
      <form onSubmit={handleLogIn}>
        <input className={`user-input ${error && error.status === 1 ? "error" : ""}`} value={username} onChange={e => { setUsername(e.target.value); setError(null) }} type="text" placeholder="Username" />
        <input className={`user-input ${error && error.status === 2 ? "error" : ""}`} value={password} onChange={e => { setPassword(e.target.value); setError(null) }} type="password" placeholder="Password" />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>
        <button className="btn white submit">Log in</button>
      </form>
      <div className="bottom-link">Don't have an account? <button className="link" onClick={() => dispatch(toggleSignUp())}>Sign up</button></div>
    </div>
  )
}