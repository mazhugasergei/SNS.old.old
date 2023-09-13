import axios from "axios"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { setUser } from "store/slices/userSlice"
import { toggleLogIn } from "store/slices/menuSlice"

export default () => {
  const dispatch = useDispatch()
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<{ status: number, message: string } | null>(null)

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={`auth ${signing_up ? 'shown' : ''}`}>
      <div className="title">﹏<br/>Create your account</div>
      <form onSubmit={handleSignUp}>
        <input className={`user-input`} type="text" placeholder="Username" />
        <input className={`user-input`} type="password" placeholder="Password" />
        <input className={`user-input`} type="password" placeholder="Repeat password" />
        <button className="btn white">Sign up</button>
      </form>
      <div className="bottom-link">Have an account? <button className="link" onClick={() => dispatch(toggleLogIn())}>Log in</button></div>
    </div>
  )
}