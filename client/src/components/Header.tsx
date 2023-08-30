import { Link } from "react-router-dom"

export default () => {
  return (
    <header className="wrapper">
      <Link to="/" className="logo">Moments</Link>
      <div className="account-btns">
        <Link to="/log-in" className="btn transparent">Log in</Link>
        <Link to="/sign-up" className="btn">Sign up</Link>
      </div>
    </header>
  )
}