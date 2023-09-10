import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { toggleOpened, toggleLogIn, toggleSignUp } from "store/slices/menuSlice"
import LogIn from "components/LogIn"
import SignUp from "components/SignUp"
import { FiArrowLeft } from "react-icons/fi"

export default () => {
  const dispatch = useDispatch()
  const menu_opened = useSelector((state: RootState) => state.menu.opened)
  const is_auth = useSelector((state: RootState) => state.user.is_auth)
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)

  const toggleMenu = () => dispatch(toggleOpened())
  const toggleLoggingIn = () => dispatch(toggleLogIn())
  const toggleSigningUp = () => dispatch(toggleSignUp())

  return (
    <menu className={menu_opened ? "" : "hidden"}>
      {/* menu title */}
      <div className="title">
        <span className={`auth-title ${logging_in ? "" : "hidden"}`} onClick={toggleLoggingIn}><FiArrowLeft /> Log in</span>
        <span className={`auth-title ${signing_up ? "" : "hidden"}`} onClick={toggleSigningUp}><FiArrowLeft /> Sign up</span>
        <span className={`menu-title ${(logging_in || signing_up) ? "hidden" : ""}`}>Menu</span>
      </div>
      
      {/* auth forms */}
      <LogIn />
      <SignUp />
      
      {/* menu items */}
      <nav className={`navigation ${(logging_in || signing_up) ? "logging-in" : ""}`}>
        <ul>
          <li><Link to="/" className="btn transparent" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/" className="btn transparent" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/" className="btn transparent" onClick={toggleMenu}>Works</Link></li>
          <li><Link to="/" className="btn transparent" onClick={toggleMenu}>Lorem</Link></li>
        </ul>
        <div className="account-btns">
          { is_auth ?
            <Link to="/profile">Profile</Link>
            :
            <>
              <button className="btn transparent" onClick={() => dispatch(toggleLogIn())}>Log in</button>
              <button className="btn white" onClick={() => dispatch(toggleSignUp())}>Sign up</button>
            </>
          }
        </div>
      </nav>
    </menu>
  )
}