import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import axios from "axios"
import { toggleEditingProfile, toggleExpandedMenu } from "store/slices/menuSlice"
import { BiUser, BiSolidPencil } from "react-icons/bi"
import { setUser } from "store/slices/userSlice"
import ConfirmDeletion from "./ConfirmDeletion"
import PFPActionWindow from "./PFPActionWindow"

export default () => {
  const dispatch = useDispatch()
  const transition = useSelector((state: RootState) => state.ui.transition)
  const editing_profile = useSelector((state: RootState) => state.menu.editing_profile)
  const pfp = useSelector((state: RootState) => state.user.pfp)
  const username = useSelector((state: RootState) => state.user.username)
  const display_name = useSelector((state: RootState) => state.user.display_name)
  const confirming_email = useSelector((state: RootState) => state.menu.confirming_email)

  const [newPFP, setNewPFP] = useState<string | ArrayBuffer | null>()
  const [newUsername, setNewUsername] = useState("")
  const [newDisplayName, setNewDisplayName] = useState("")
  const [pfpActionWindow, setPfpActionWindow] = useState<boolean | string>(false)
  const [deletingAccount, setDeletingAccount] = useState<boolean | string>(false)
  const [error, setError] = useState<{ status: number, message: string } | null>(null)
    // 1 - username is in use

  useEffect(() => setNewPFP(pfp), [pfp])
  useEffect(() => setNewUsername(username), [username])
  useEffect(() => setNewDisplayName(display_name), [display_name])

  const handleChangePFP = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement
    const files = input.files
    if(files && files.length){
      const reader = new FileReader()
      reader.onload = () => setNewPFP(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

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
      { newPFP, newUsername, newDisplayName },
      { headers: { "x-access-token": localStorage.getItem('x-access-token') } }
    )
      .then(res => res.data)
      .then(data => {
        if(data.status) setError({ status: data.status, message: data.message })
        else{
          // set token
          localStorage.setItem('x-access-token', data.token)
          // set user info
          dispatch(setUser({ pfp: newPFP, username: newUsername, display_name: newDisplayName }))
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

  // disappear transitions
  useEffect(() => {
    if(typeof deletingAccount === "string"){
      const timeoutID = setTimeout(() => setDeletingAccount(false), transition)
      return () => clearTimeout(timeoutID)
    }
  }, [deletingAccount])
  useEffect(() => {
    if(typeof pfpActionWindow === "string"){
      const timeoutID = setTimeout(() => setPfpActionWindow(false), transition)
      return () => clearTimeout(timeoutID)
    }
  }, [pfpActionWindow])
  useEffect(() => setPfpActionWindow(" "), [newPFP])

  return (
    <div className={`editing-profile ${confirming_email ? "secondary" : ""} ${editing_profile ? '' : 'hidden'}`}>
      {/* Profile Picture */}
      <div className="pfp-cont" onClick={() => setPfpActionWindow(true)}>
        <div className="pfp" style={{ backgroundImage: `url('${newPFP}')` }}>
          { !newPFP && <BiUser className="profile" /> }
        </div>
        <input id="pfpInput" type="file" accept="image/*" onChange={handleChangePFP} />
        <div className="edit"><BiSolidPencil /></div>
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
        <button className="btn white submit" onClick={handleSubmit}>Save</button>
        <button className="btn white transparent" onClick={handleLogOut}>Log out</button>
        <button className="btn red transparent" onClick={() => setDeletingAccount(true)}>Delete account</button>
      </div>
      
      { pfpActionWindow && <PFPActionWindow {...{pfpActionWindow, setPfpActionWindow, setNewPFP}} /> }
      { deletingAccount && <ConfirmDeletion {...{deletingAccount, setDeletingAccount}} /> }
    </div>
  )
}