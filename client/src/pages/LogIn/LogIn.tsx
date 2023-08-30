import axios from "axios"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

export default () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState(false)

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // get user's id if there's such a user
    const user_id = await axios.get(`${process.env.REACT_APP_API}/users/username/${username}`)
      .then(res => res.data?._id)
    // if no such a user, display error
    if(!user_id) setError(true)
    // check if the password is correct
    else{
      const access = await axios.get(`${process.env.REACT_APP_API}/passwords/${user_id}`, { params: { password } })
        .then(res => res.data.access)
      if(!access) setError(true)
      else console.log("access is granted")
    }
  }

  return (
    <main className="log-in_sign-up wrapper" onSubmit={handleFormSubmit}>
      <div className="title">Login</div>
      <form>
        <input className={`${error ? "error" : ""}`} type="text" placeholder="Username" value={username} onChange={e => { setUsername(e.target.value); setError(false) }} />
        <input className={`${error ? "error" : ""}`} type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setError(false) }} />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - incorrect credentials</div>
        <button className="btn">Log In</button>
      </form>
      <div className="sing-up-link">Don't have an account? <Link to="/sign-up">Sign up</Link></div>
    </main>
  )
}