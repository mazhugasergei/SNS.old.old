import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "store/store"

export default () => {
  const is_auth = useSelector((state: RootState) => state.user.is_auth)

  return (
    <header className="wrapper">
      <Link to="/" className="logo">Moments</Link>
      {/* <div className="account-btns">
        { is_auth ?
            <>
              <Link to="/profile" className="btn outline">Profile</Link>
            </>
          :
            <>
              <Link to="/log-in" className="btn transparent">Login</Link>
              <Link to="/sign-up" className="btn outline">Sign up</Link>
            </>
        }
      </div> */}
    </header>
  )
}