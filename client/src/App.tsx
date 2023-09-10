import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
// redux
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "store/slices/userSlice"
import { RootState } from "store/store"
// components
import Header from "components/Header"
import Menu from "components/Menu"
import MenuBtn from "components/MenuBtn"
// pages
import Home from "pages/Home/Home"

export default () => {
  const dispatch = useDispatch()
  const menu_opened = useSelector((state: RootState) => state.menu.opened)
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)

  // checl if logged in with valid token
  axios.get(`${process.env.REACT_APP_API}/auth/is-auth`, { headers:{ "x-access-token": localStorage.getItem('x-access-token') } })
    .then(res => { if(res) dispatch(setUser({ _id: res.data.user_id })) })

  return (
    <BrowserRouter basename="/SNS">
      <Menu />
      <MenuBtn />
      <div className={`content ${menu_opened ? 'menu-opened' : ''} ${(logging_in || signing_up) ? 'hidden' : ''}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <div className={`content bg-card ${menu_opened ? 'menu-opened' : ''} ${(logging_in || signing_up) ? 'hidden' : ''}`} />
    </BrowserRouter>
  )
}