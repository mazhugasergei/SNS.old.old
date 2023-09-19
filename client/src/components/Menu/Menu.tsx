import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { toggleLoggingIn, toggleSigningUp, toggleConfirmingEmail, toggleEditingProfile, toggleExpandedMenu } from "store/slices/menuSlice"
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
  const editing_profile = useSelector((state: RootState) => state.menu.editing_profile)

  return (
    <menu className={menu_opened ? "" : "hidden"}>
      {/* menu title */}
      <div className="title">
        <button className={`auth-title ${logging_in ? "" : "hidden"}`} onClick={() => { dispatch(toggleLoggingIn()); dispatch(toggleExpandedMenu()) }}><FiArrowLeft /> Log in</button>
        <button className={`auth-title ${signing_up ? "" : "hidden"}`} onClick={() => { dispatch(toggleSigningUp()); dispatch(toggleExpandedMenu()) }}><FiArrowLeft /> Sign up</button>
        <button className={`auth-title secondary ${confirming_email ? "" : "hidden"}`} onClick={() => { dispatch(toggleConfirmingEmail()); dispatch(toggleSigningUp()) }}><FiArrowLeft /> Email code</button>
        <button className={`auth-title ${editing_profile ? "" : "hidden"}`} onClick={() => { dispatch(toggleEditingProfile()); dispatch(toggleExpandedMenu()) }}><FiArrowLeft /> Profile</button>
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
            <button className="profile" onClick={() => { dispatch(toggleEditingProfile()); dispatch(toggleExpandedMenu()) }}>
              <div className="pfp"><BiUser /></div>
              <span>{ display_name }</span>
            </button>
            :
            <>
              <button className="btn transparent" onClick={() => { dispatch(toggleLoggingIn()); dispatch(toggleExpandedMenu()) }}>Log in</button>
              <button className="btn white" onClick={() => { dispatch(toggleSigningUp()); dispatch(toggleExpandedMenu()) }}>Sign up</button>
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