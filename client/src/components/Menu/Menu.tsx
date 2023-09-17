import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { toggleLogIn, toggleSignUp, toggleProfileSettings } from "store/slices/menuSlice"
// components
import Auth from "./Forms/Auth/Auth"
import ProfileSettings from "./Forms/ProfileSettings"
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
  const expanded_menu = useSelector((state: RootState) => state.menu.expanded_menu)
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)
  const confirming_email = useSelector((state: RootState) => state.menu.confirming_email)
  const profile_settings = useSelector((state: RootState) => state.menu.profile_settings)

  return (
    <menu className={menu_opened ? "" : "hidden"}>
      {/* menu title */}
      <div className="title">
        <button className={`auth-title ${logging_in ? "" : "hidden"}`} onClick={() => dispatch(toggleLogIn())}><FiArrowLeft /> Log in</button>
        <button className={`auth-title ${signing_up ? "" : "hidden"}`} onClick={() => dispatch(toggleSignUp())}><FiArrowLeft /> Sign up</button>
        <button className={`auth-title secondary ${confirming_email ? "" : "hidden"}`} onClick={() => dispatch(toggleSignUp())}><FiArrowLeft /> Email code</button>
        <button className={`auth-title ${profile_settings ? "" : "hidden"}`} onClick={() => dispatch(toggleProfileSettings())}><FiArrowLeft /> Profile</button>
        <button className={`menu-title ${expanded_menu ? "hidden" : ""}`}>Menu</button>
      </div>
      
      {/* menu items */}
      <nav className={`navigation ${expanded_menu ? "logging-in" : ""}`}>
        <ul>
          <li><Link to="/" className="btn transparent" onClick={handleToggleMenu}>Home</Link></li>
          <li><Link to="/" className="btn transparent" onClick={handleToggleMenu}>Lorem</Link></li>
          <li><Link to="/" className="btn transparent" onClick={handleToggleMenu}>Ipsum</Link></li>
          <li><Link to="/" className="btn transparent" onClick={handleToggleMenu}>Dolor</Link></li>
        </ul>
        <div className="account-btns">
          { is_auth ?
            <button className="profile" onClick={() => dispatch(toggleProfileSettings())}>
              <div className="pfp"><BiUser /></div>
              <span>{ display_name }</span>
            </button>
            :
            <>
              <button className="btn transparent" onClick={() => dispatch(toggleLogIn())}>Log in</button>
              <button className="btn white" onClick={() => dispatch(toggleSignUp())}>Sign up</button>
            </>
          }
        </div>
      </nav>
      
      {/* auth forms */}
      <Auth />
      <ProfileSettings />
    </menu>
  )
}