import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "store/store"

export default () => {
  const is_auth = useSelector((state: RootState) => state.user.is_auth)

  return (
    <header className="wrapper">
      <Link to="/" className="logo">Moments</Link>
    </header>
  )
}