import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
// redux
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "store/slices/userSlice"
// components
import Header from "components/Header"
import Menu from "components/Menu"
import MenuBtn from "components/MenuBtn"
// pages
import Home from "pages/Home/Home"
import LogIn from "pages/LogIn/LogIn"
import SignUp from "pages/SignUp/SignUp"
import { RootState } from "store/store"

export default () => {
  const dispatch = useDispatch()
  const menuOpened = useSelector((state: RootState) => state.menu.opened)

  // checl if logged in with valid token
  axios.get(`${process.env.REACT_APP_API}/is-auth`, { headers:{ "x-access-token": localStorage.getItem('x-access-token') } })
    .then(res => { if(res) dispatch(setUser({ _id: res.data.user_id })) })

  return (
    <BrowserRouter>
      <Menu />
      <MenuBtn />
      <div className={`content ${menuOpened ? 'menu-opened' : ''}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
      <div className={`content bg-card ${menuOpened ? 'menu-opened' : ''}`} />
    </BrowserRouter>
  )
}