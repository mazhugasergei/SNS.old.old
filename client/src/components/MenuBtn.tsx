import { useDispatch, useSelector } from "react-redux"
import { toggleOpened, toggleLogIn, toggleSignUp } from "store/slices/menuSlice"
import { RootState } from "store/store"

export default () => {
  const dispatch = useDispatch()
  const menu_opened = useSelector((state: RootState) => state.menu.opened)
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)

  const toggleMenu = () => dispatch(toggleOpened())
  const toggleMenuAuth = () => dispatch(logging_in ? toggleLogIn() : signing_up ? toggleSignUp() : toggleOpened())

  return (
    <button className={`menu-btn ${menu_opened ? "menu-opened" : ""} ${(logging_in || signing_up) ? "back" : ""}`} onClick={(logging_in || signing_up) ? toggleMenuAuth : toggleMenu}>
      <div className="lines-cont">
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
    </button>
  )
}