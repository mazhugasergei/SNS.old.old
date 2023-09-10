import { useDispatch, useSelector } from "react-redux"
import { toggleOpened, toggleLogIn, toggleSignUp } from "store/slices/menuSlice"
import { RootState } from "store/store"

export default () => {
  const dispatch = useDispatch()
  const menu_opened = useSelector((state: RootState) => state.menu.opened)
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)

  const toggleMenu = () => {
    (() => logging_in ? dispatch(toggleLogIn()) : signing_up ? dispatch(toggleSignUp()) : null)()
    dispatch(toggleOpened())
  }

  return (
    <button className={`menu-btn ${menu_opened ? "menu-opened" : ""}`} onClick={toggleMenu}>
      <div className="lines-cont">
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
    </button>
  )
}