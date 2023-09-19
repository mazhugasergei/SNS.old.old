import { useDispatch, useSelector } from "react-redux"
import { closeAll, toggleMenuOpened } from "store/slices/menuSlice"
import { RootState } from "store/store"

export default () => {
  const dispatch = useDispatch()
  const menu_opened = useSelector((state: RootState) => state.menu.menu_opened)

  return (
    <button className={`menu-btn ${menu_opened ? "menu-opened" : ""}`} onClick={() => dispatch(menu_opened ? closeAll() : toggleMenuOpened())}>
      <div className="lines-cont">
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
    </button>
  )
}