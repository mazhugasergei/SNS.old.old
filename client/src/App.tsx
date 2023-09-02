import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
// redux
import { useDispatch } from "react-redux"
import { setUser } from "store/slices/userSlice"
// components
import Header from "components/Header"
import Menu from "components/Menu"
// pages
import Home from "pages/Home/Home"
import LogIn from "pages/LogIn/LogIn"
import SignUp from "pages/SignUp/SignUp"

export default () => {
  const dispatch = useDispatch()

  // checl if logged in with valid token
  axios.get(`${process.env.REACT_APP_API}/is-auth`, { headers:{ "x-access-token": localStorage.getItem('x-access-token') } })
    .then(res => { if(res) dispatch(setUser({ _id: res.data.user_id })) })

  return (
    <BrowserRouter>
      <Menu />
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
      <div className="content bg-card" />
    </BrowserRouter>
  )
}