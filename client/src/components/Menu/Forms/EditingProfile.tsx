import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import axios from "axios"
import { toggleEditingProfile, toggleExpandedMenu } from "store/slices/menuSlice"
import { BiUser, BiSolidPencil } from "react-icons/bi"
import { setUser } from "store/slices/userSlice"

export default () => {
  const dispatch = useDispatch()
  const editing_profile = useSelector((state: RootState) => state.menu.editing_profile)
  const username = useSelector((state: RootState) => state.user.username)
  const display_name = useSelector((state: RootState) => state.user.display_name)
  const confirming_email = useSelector((state: RootState) => state.menu.confirming_email)

  const [newUsername, setNewUsername] = useState("")
  const [newDisplayName, setNewDisplayName] = useState("")
  const [password, setPassword] = useState("")
  const [deletingAccount, setDeletingAccount] = useState(false)
  const [error, setError] = useState<{ status: number, message: string } | null>(null)
    // 1 - username is in use

  useEffect(()=>{
    setNewUsername(username)
    setNewDisplayName(display_name)
  }, [username, display_name])

  const handleChangeUsername = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement
    const value = input.value
    const regex = /^[a-zA-Z0-9_@.]*$/
    regex.test(value) && setNewUsername(value)
    setError(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_API}/users/update`,
      {newUsername, newDisplayName },
      { headers: { "x-access-token": localStorage.getItem('x-access-token') } }
    )
      .then(res => res.data)
      .then(data => {
        if(data.status) setError({ status: data.status, message: data.message })
        else{
          // set token
          localStorage.setItem('x-access-token', data.token)
          // set user info
          dispatch(setUser({ username: newUsername, display_name: newDisplayName, email: data.email }))
          // back to menu
          dispatch(toggleEditingProfile())
          dispatch(toggleExpandedMenu())
        }
      })
  }

  const handleLogOut = () => {
    localStorage.removeItem('x-access-token')
    dispatch(setUser(null))
    dispatch(toggleEditingProfile())
    dispatch(toggleExpandedMenu())
  }

  const handleDeleteAccount = async () => {
    await axios.post(`${process.env.REACT_APP_API}/users/delete`, {}, {
      headers: { "x-access-token": localStorage.getItem('x-access-token') }
    })
      .then(res => res.data && handleLogOut())
  }

  return (
    <form className={`profile-settings ${confirming_email ? "secondary" : ""} ${editing_profile ? '' : 'hidden'}`} onSubmit={handleSubmit}>
      {/* Profile Picture */}
      <div className="pfp-cont">
        <button type="button" className="pfp">
          <BiUser className="profile" />
        </button>
        <button type="button" className="edit">
          <BiSolidPencil />
        </button>
      </div>

      <div className="inputs">
        {/* Username */}
        <label>Your ID</label>
        <input
          id="username" className={`primary ${error && error.status === 1 ? "error" : ""}`}
          value={newUsername} onChange={handleChangeUsername}
          type="text" placeholder={username} maxLength={30} required
        />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>

        {/* Display Name */}
        <label>Your Name</label>
        <input
          id="display_name" className="primary"
          value={newDisplayName} onChange={e => { setNewDisplayName(e.target.value); setError(null) }}
          type="text" placeholder={display_name} maxLength={30} required
        />
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button className="btn white submit">Save</button>
        <button className="btn white transparent" type="button" onClick={handleLogOut}>Log out</button>
        <button className="btn red transparent" type="button" onClick={() => setDeletingAccount(true)}>Delete account</button>
      </div>

      {/* Dialog Window */}
      { deletingAccount && <div className="dialog-cont">
        <div className="dialog" onSubmit={handleDeleteAccount}>
          <div className="title">Confirm password</div>
          <input
            className="primary"
            value={password} onChange={e => setPassword(e.target.value)}
            type="password" required
          />
          <button className="btn white">Confirm</button>
        </div>
      </div> }
    </form>
  )
}