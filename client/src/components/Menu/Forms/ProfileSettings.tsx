import { FormEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
// icons
import { BiUser, BiSolidPencil } from "react-icons/bi"

export default () => {
  const profile_settings = useSelector((state: RootState) => state.menu.profile_settings)
  const username = useSelector((state: RootState) => state.user.username)
  const display_name = useSelector((state: RootState) => state.user.display_name)

  const [newUsername, setNewUsername] = useState("")
  const [newDisplayName, setNewDisplayName] = useState("")

  useEffect(()=>{
    setNewUsername(username)
    setNewDisplayName(display_name)
  }, [username, display_name])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form className={`profile-settings ${profile_settings ? '' : 'hidden'}`} onSubmit={handleSubmit}>
      <div className="pfp-cont">
        <button type="button" className="pfp">
          <BiUser className="profile" />
        </button>
        <button type="button" className="edit">
          <BiSolidPencil />
        </button>
      </div>
      <label htmlFor="username">Your ID</label>
      <input id="username" className="primary" type="text" placeholder={username} value={newUsername} onChange={e => setNewUsername(e.target.value)} />
      <label htmlFor="display_name">Your Name</label>
      <input id="display_name" className="primary" type="text" placeholder={display_name} value={newDisplayName} onChange={e => setNewDisplayName(e.target.value)} />
      <button className="btn white submit">Save</button>
    </form>
  )
}