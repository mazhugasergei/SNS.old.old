import axios from "axios"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { setUser } from "store/slices/userSlice"
import { toggleSignUp } from "store/slices/menuSlice"

export default () => {
  const dispatch = useDispatch()
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<{ status: number, message: string } | null>(null)

  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then(res => {
        if(res.data.status) setError({
          status: res.data.status,
          message: res.data.message
        })
        else{
          localStorage.setItem('x-access-token', res.data.token)
          dispatch(setUser({ _id: res.data._id }))
        }
      })
  }

  return (
    <div className={`auth ${logging_in ? 'shown' : ''}`}>
      <div className="title">Welcome back!</div>
      <form onSubmit={handleLogIn}>
        <input className={`${error && error.status === 1 ? "error" : ""}`} type="text" placeholder="Username" value={username} onChange={e => { setUsername(e.target.value); setError(null) }} />
        <input className={`${error && error.status === 2 ? "error" : ""}`} type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setError(null) }} />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>
        <button className="btn white">Log in</button>
      </form>
      <div className="bottom-link">Don't have an account? <span className="link" onClick={() => dispatch(toggleSignUp())}>Sign up</span></div>
    </div>
  )
}