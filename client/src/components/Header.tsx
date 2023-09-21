import { useEffect } from "react"
import { Link } from "react-router-dom"

export default () => {
  useEffect(()=>{
    const content = document.querySelector<HTMLDivElement>('.content')
    const header = document.querySelector('header')
    content?.addEventListener('scroll', ()=>{
      if(header) content.scrollTop ? header.classList.add('content-scrolled') : header.classList.remove('content-scrolled')
    })
  }, [])

  return (
    <header className="wrapper">
      <Link to="/" className="logo">Lorem Ipsum</Link>
    </header>
  )
}