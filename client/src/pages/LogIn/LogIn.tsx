import axios from "axios"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

export default () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<{ status: number, message: string } | null>(null)

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then(res => {
        if(res.data.status) setError({
          status: res.data.status,
          message: res.data.message
        })
        else localStorage.setItem('x-access-token', res.data.token)
      })
  }

  return (
    <main className="log-in_sign-up wrapper" onSubmit={handleFormSubmit}>
      <div className="title">Login</div>
      <form>
        <input className={`${error && error.status === 1 ? "error" : ""}`} type="text" placeholder="Username" value={username} onChange={e => { setUsername(e.target.value); setError(null) }} />
        <input className={`${error && error.status === 2 ? "error" : ""}`} type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setError(null) }} />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>
        <button className="btn">Log In</button>
      </form>
      <div className="sing-up-link">Don't have an account? <Link to="/sign-up">Sign up</Link></div>
    </main>
  )
}