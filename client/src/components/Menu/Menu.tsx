import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { toggleLogIn, toggleSignUp } from "store/slices/menuSlice"
// components
import LogIn from "components/Menu/LogIn"
import SignUp from "components/Menu/SignUp"
import ConfirmEmail from "components/Menu/ConfirmEmail"
// hooks
import useToggleMenu from "hooks/useToggleMenu"
// icons
import { FiArrowLeft } from "react-icons/fi"
import { BiUser } from "react-icons/bi"

export default () => {
  const { menu_opened, handleToggleMenu } = useToggleMenu()
  const dispatch = useDispatch()
  const is_auth = useSelector((state: RootState) => state.user.is_auth)
  const display_name = useSelector((state: RootState) => state.user.display_name)
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)
  const confirming_email = useSelector((state: RootState) => state.menu.confirming_email)
  const [email, setEmail] = useState("markuswedler8@gmail.com")
  const [password, setPassword] = useState("123")
  const [repeatPassword, setRepeatPassword] = useState("123")

  const handleToggleLogIn = () => dispatch(toggleLogIn())
  const handleToggleSignUp = () => dispatch(toggleSignUp())

  return (
    <menu className={menu_opened ? "" : "hidden"}>
      {/* menu title */}
      <div className="title">
        <button className={`auth-title ${logging_in ? "" : "hidden"}`} onClick={handleToggleLogIn}><FiArrowLeft /> Log in</button>
        <button className={`auth-title ${signing_up ? "" : "hidden"}`} onClick={handleToggleSignUp}><FiArrowLeft /> Sign up</button>
        <button className={`auth-title secondary ${confirming_email ? "" : "hidden"}`} onClick={handleToggleSignUp}><FiArrowLeft /> Email code</button>
        <button className={`menu-title ${(logging_in || signing_up || confirming_email) ? "hidden" : ""}`}>Menu</button>
      </div>
      
      {/* auth forms */}
      <LogIn {...{email, setEmail, password, setPassword}} />
      <SignUp {...{email, setEmail, password, setPassword, repeatPassword, setRepeatPassword}} />
      <ConfirmEmail {...{email, password}} />
      
      {/* menu items */}
      <nav className={`navigation ${(logging_in || signing_up || confirming_email) ? "logging-in" : ""}`}>
        <ul>
          <li><Link to="/" className="btn transparent" onClick={handleToggleMenu}>Home</Link></li>
          <li><Link to="/" className="btn transparent" onClick={handleToggleMenu}>Lorem</Link></li>
          <li><Link to="/" className="btn transparent" onClick={handleToggleMenu}>Ipsum</Link></li>
          <li><Link to="/" className="btn transparent" onClick={handleToggleMenu}>Dolor</Link></li>
        </ul>
        <div className="account-btns">
          { is_auth ?
            <Link to="/profile" className="profile">
              <div className="pfp"><BiUser /></div>
              <span>{ display_name }</span>
            </Link>
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