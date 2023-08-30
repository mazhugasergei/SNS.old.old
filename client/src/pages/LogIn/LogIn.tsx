import { Link } from "react-router-dom"

export default () => {
  return (
    <main className="log-in_sign-up wrapper">
      <div className="title">Login</div>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button className="btn">Log In</button>
      </form>
      <div className="sing-up-link">Don't have an account? <Link to="/sign-up">Sign up</Link></div>
    </main>
  )
}