import { useDispatch, useSelector } from "react-redux"
import { toggleOpened } from "store/slices/menuSlice"
import { RootState } from "store/store"

export default () => {
  const dispatch = useDispatch()
  const menuOpened = useSelector((state: RootState) => state.menu.opened)

  const toggleMenu = () => dispatch(toggleOpened())

  return (
    <button className={`menu-btn ${menuOpened ? "menu-opened" : ""}`} onClick={toggleMenu}>
      <div className="lines-cont">
        <div className="line" />
        <div className="line" />
      </div>
    </button>
  )
}