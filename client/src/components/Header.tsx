import axios from "axios"
import { Link } from "react-router-dom"

export default () => {
  return (
    <header className="wrapper">
      <Link to="/" className="logo">Moments</Link>
      <div className="account-btns">
        <button className="btn outline" onClick={() => {
          axios.get(`${process.env.REACT_APP_API}/is-auth`, {
            headers: {
              "x-access-token": localStorage.getItem('x-access-token')
            }
          })
            .then(res => console.log(res.data))
        }}>is auth?</button>
        <Link to="/log-in" className="btn transparent">Log in</Link>
        {/* <Link to="/sign-up" className="btn">Sign up</Link> */}
      </div>
    </header>
  )
}