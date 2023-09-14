// hooks
import useToggleMenu from "hooks/useToggleMenu"

export default () => {
  const { menu_opened, handleToggleMenu } = useToggleMenu()

  return (
    <button className={`menu-btn ${menu_opened ? "menu-opened" : ""}`} onClick={handleToggleMenu}>
      <div className="lines-cont">
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
    </button>
  )
}