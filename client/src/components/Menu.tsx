import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { toggleOpened } from "store/slices/menuSlice"

export default () => {
  const dispatch = useDispatch()
  const is_auth = useSelector((state: RootState) => state.user.is_auth)

  const toggleMenu = () => dispatch(toggleOpened())

  return (
    <menu>
      <div className="title">Menu</div>
      <nav>
        <ul>
          <li><Link to="/" className="btn transparent" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/" className="btn transparent" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/" className="btn transparent" onClick={toggleMenu}>Works</Link></li>
        </ul>
        <div className="account-btns">
          { is_auth ?
            <>
              <Link to="/profile">Profile</Link>
            </>
            :
            <>
              <Link to="/log-in" className="btn transparent" onClick={toggleMenu}>Login</Link>
              <Link to="/sign-up" className="btn" onClick={toggleMenu}>Sign up</Link>
            </>
          }
        </div>
      </nav>
    </menu>
  )
}