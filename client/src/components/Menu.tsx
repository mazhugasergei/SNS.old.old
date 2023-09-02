import { useState, useEffect } from "react"

export default () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false)

  const toggleMenu = () => setMenuOpened(prevState => !prevState)

  useEffect(()=>{
    const contents =  document.querySelectorAll('.content')
    if(contents) contents.forEach(content => {
      if(menuOpened) content.classList.add('menu-opened')
      else content.classList.remove('menu-opened')
    })
  }, [menuOpened])

  return (
    <button className={`menu-btn ${menuOpened ? "menu-opened" : ""}`} onClick={toggleMenu}>
      <div className="lines-cont">
        <div className="line" />
        <div className="line" />
      </div>
    </button>
  )
}