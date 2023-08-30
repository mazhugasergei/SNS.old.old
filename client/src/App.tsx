import { BrowserRouter, Routes, Route } from "react-router-dom"
// components
import Header from "components/Header"
// pages
import Home from "pages/Home/Home"
import LogIn from "pages/LogIn/LogIn"
import SignUp from "pages/SignUp/SignUp"

export default () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}