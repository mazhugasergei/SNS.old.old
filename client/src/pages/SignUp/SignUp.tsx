import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { RootState } from "store/store"

export default () => {
  const is_auth = useSelector((state: RootState) => state.user.is_auth)
  
  return (
    <main className="log-in_sign-up wrapper">
      { is_auth && <Navigate to="/" /> }
      <div className="title">Create your account</div>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Repeat password" />
        <div className="not-a-robot">
          <input type="checkbox" id="notRobotCheckbox" />
          <label htmlFor="notRobotCheckbox">
            <div className="checkbox" />
            <span>I'm not a robot</span>
          </label>
        </div>
        <button className="btn">Sign up</button>
      </form>
    </main>
  )
}