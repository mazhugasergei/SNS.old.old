import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { toggleEditingProfile, toggleExpandedMenu } from "store/slices/menuSlice"
import { setUser } from "store/slices/userSlice"
import axios from "axios"

export default ({ deletingAccount, setDeletingAccount }: { deletingAccount: boolean | string, setDeletingAccount: (value: boolean | string) => void }) => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<{ status: number, message: string } | null>(null)

  const handleDeleteAccount = async (e: FormEvent) => {
    e.preventDefault()

    await axios.post(`${process.env.REACT_APP_API}/users/delete`,
      { password },
      { headers: { "x-access-token": localStorage.getItem('x-access-token') } }
    )
      .then(res => res.data)
      .then(data => {
        if(data.status) setError({ status: data.status, message: data.message })
        else{
          setDeletingAccount(" ")
          localStorage.removeItem('x-access-token')
          dispatch(setUser(null))
          dispatch(toggleEditingProfile())
          dispatch(toggleExpandedMenu())
        }
      })
  }

  return (
    <div className={`dialog-cont ${typeof deletingAccount === "boolean" && deletingAccount ? "" : "hidden"}`}>
      <div className="bg" onClick={() => setDeletingAccount(" ")} />
      <form className="dialog" onSubmit={handleDeleteAccount}>
        <div className="window-title">Confirm deletion</div>
        <input
          className={`primary ${error && error.status === 1 ? "error" : ""}`}
          value={password} onChange={e => { setPassword(e.target.value); setError(null) }}
          type="password" placeholder="Password" required
        />
        <div className={`error-message ${error ? "" : "hidden"}`}>Uh oh - { error && error.message }</div>
        <div className="checkbox-cont">
          <input type="checkbox" id="confirmDeletion" required />
          <label htmlFor="confirmDeletion">I understand that my account and all data related to it will be permanently deleted with no possibility to recover them.</label>
        </div>
        <div className="action-btns">
          <button className="btn white">Confirm</button>
          <button className="btn white transparent" type="button" onClick={() => setDeletingAccount(" ")}>Cancel</button>
        </div>
      </form>
    </div>
  )
}